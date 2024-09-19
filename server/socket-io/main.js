import { joinroom, leaveroom, getusers, getplayers, getgametype, setgametype, getgamestatus, toggleplayroom, setgamestatus, togglepublicroom, getpublicstatus } from "../controllers/room.js";
import socketTowerBlock from "./games/TowerBlock/game.js";
import socketTheCube from "./games/TheCube/game.js";
import socketHextris from "./games/Hextris/game.js";
import jwt from 'jsonwebtoken'
import { getavatar } from "../controllers/profile.js";


var globalUsers = []
var globalChat = []
var publicRooms = []

const mainsocket = (io) => {
    return io.on("connection", (client) => {
        var socket = {user: '', roomId: ''};
        var gameType = ''
        client.isPlaying = false

        client.on('disconnect', async () => {
            globalUsers.splice(globalUsers.indexOf(socket.user), 1)
            var image = await getavatar(socket.user)
            image = image ? image : 'null'
            var user = {uname: socket.user, image: image}
            client.broadcast.emit('removeUserList', {user, type: 'Global'})
            
            if (socket.user && socket.roomId) {
                await leaveroom(socket.user, socket.roomId)
                client.leave(socket.roomId)
                client.removeAllListeners()

                var users = await getplayers(socket.roomId)
                if (users) {
                    io.to(socket.roomId).emit('sendPlayers', {users})
                }
            }
        })

        client.on('addUser', async ({username}) => {
            if (globalUsers.indexOf(username) == -1) {
                socket.user = username ? username : `Guest-${Math.random().toString(32).slice(2,8)}`
                globalUsers.push(socket.user)
                var image = await getavatar(socket.user)
                image = image ? image : 'null'
                var user = {uname: socket.user, image: image}
                client.broadcast.emit('addUserList', {user, type: 'Global'})
            }      
        })

        client.on('chatUserList', async ({type}) => {
            if (type == 'Global') {
                var usernameList = globalUsers 
            }
            else if (type == 'Room') {
                var usernameList = await getusers(socket.roomId)
            }
            else if (type == 'Group') {

            }
            
            if (usernameList) {
                var users = []
                const loadImages = async () => {
                    var uname;
                    for (uname of usernameList) {
                        var image = await getavatar(uname)
                        image = image ? image : 'null'
                        users.push({uname, image})
                    }
                }
                await loadImages()
                client.emit('getUserList', {users, type})
            }
        })

        client.on('chatMessage', async ({text, type}) => {
            var username = socket.user
            var image; 
            var timestamp = Date.now()
            try {
                image = await getavatar(username)
            } catch (error) { 
                
            }
            image = image ? image : 'null' 
            
            if (username && text) {
                if (type === 'Global') {
                    globalChat.push({username, image, text, timestamp})
                    globalChat.length >= 20 ? globalChat.shift() : null
                    var latestChat = globalChat[globalChat.length - 1]
                    io.sockets.emit('getMessage', {latestChat, type})
                }

                else if (type === 'Room') {
                    var latestChat = {username, image, text, timestamp}
                    io.to(socket.roomId).emit('getMessage', {latestChat, type}) 
                }

                else if (type === 'Group') {

                }
            }   
        })

        client.on('joinRoom', async ({username, roomId}) => {
            if (socket.user && socket.roomId) {
                await leaveroom(socket.user, socket.roomId)
                client.leave(socket.roomId)
                client.removeAllListeners()
            }
            if (username && roomId) {
                socket.user = username
                socket.roomId = roomId
                await joinroom(socket.user, socket.roomId)
                gameType = await getgametype(socket.roomId)
                var isPublic = await getpublicstatus(socket.roomId)
                client.join(roomId)
                client.emit('setPublicStatus', {status: isPublic})
                
            }
        })

        client.on('exitRoom', async () => {
            if (socket.user && socket.roomId) {
                await leaveroom(socket.user, socket.roomId)
                client.leave(socket.roomId)
                client.removeAllListeners()
                var users = await getplayers(socket.roomId)
                if (users) {
                    io.to(socket.roomId).emit('sendPlayers', {users})
                }
            }
        })

        client.on('getPlayers', async () => {
            var users = await getplayers(socket.roomId)
            if (users) {
                io.to(socket.roomId).emit('sendPlayers', {users})
            }
        })

        client.on('gameType', async ({type}) =>{
            var isPlaying = await getgamestatus(socket.roomId)
            if (type === '' || !isPlaying) {
                gameType = type
                await setgametype(socket.roomId, gameType)
                if (type === '') {
                    await setgamestatus(socket.roomId, false)
                }
                else {
                    await setgamestatus(socket.roomId, true)
                }
                io.to(socket.roomId).emit('setGameType', {gameType})
            }
        })

        client.on('getGameType', async ({roomId}) => {
            var type = await getgametype(roomId)
            client.emit('setGameType', {gameType: type})
        })

        client.on('getPublicRooms', async () => {
            var rooms = [];
            publicRooms.forEach( async (e) => {
                var roomCount = io.sockets.adapter.rooms.get(e)?.size
                var type = await getgametype(e)
                if (io.sockets.adapter.rooms.get(e)) {
                    var room = {roomId: e, roomCount: roomCount, gameType: type}
                    rooms.push(room)
                }
                else {
                    publicRooms.splice(publicRooms.indexOf(e), 1)
                }
                if (publicRooms.indexOf(e) === publicRooms.length - 1) {
                    client.emit('setPublicRooms', {rooms})
                }
            })
        })

        client.on('togglePublic', async ({roomId}) => {
            var status = await togglepublicroom(roomId)
            
            if (status === true) {
                publicRooms.push(socket.roomId)
                io.to(socket.roomId).emit('setPublicStatus', {status: true})
            }
            else {
                publicRooms.splice(publicRooms.indexOf(socket.roomId), 1)
                io.to(socket.roomId).emit('setPublicStatus', {status: false})
            }

            if(publicRooms.length >= 12) {
                publicRooms.shift()
            }
        })

        client.on('togglePlay', async () => {
            var users = await toggleplayroom(socket.user, socket.roomId)
            client.isPlaying = !client.isPlaying
            io.to(socket.roomId).emit('sendPlayers', {users})
        })
        
    
        socketTowerBlock(io, client, socket)
        socketTheCube(io, client, socket)
        socketHextris(io, client, socket) 
    })
}

export default mainsocket