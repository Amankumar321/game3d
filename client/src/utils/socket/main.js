import { displayError } from '../functions/displayError.js';
import { io } from 'socket.io-client'

const username = localStorage.getItem('username')
const roomId = localStorage.getItem('room_id')
var publicStatus;

// const io = require('socket.io-client')

const socket = io.connect('http://localhost:5000')

export const globalsocket = () => {
    socket.on('connect', () => {
        socket.emit('addUser', {username})
    })
}

export const roomsocket = (setUserList, setGameType, setPublicStatus) =>{
    joinRoom()
    socket.on('sendPlayers', ({users}) => {
        setUserList(users)
    })
    socket.on('setGameType', ({gameType}) => {
        setGameType(gameType)
    })
    socket.on('setPublicStatus', ({status}) => {
        if (publicStatus === undefined) {
            publicStatus = status
        }
        else if (publicStatus === status) {
            displayError('CantPublicRoomError')
        }
        else {
            publicStatus = status
        }
        setPublicStatus(status)
    })
    socket.emit('getPlayers', {})
    socket.emit('getPublicStatus', {roomId})
    socket.emit('getGameType', {roomId})
}

export const updateType = (type) => {
    socket.emit('getPlayers', {})
    socket.emit('gameType', {type})
}

export const exitRoom = () => {
    socket.emit('exitRoom', {})
}

export const joinRoom = () => {
    exitRoom();
    socket.emit('joinRoom', {username, roomId})
    socket.emit('getUsers', {})
}

export const publicToggleRoom = () => {
    socket.emit('togglePublic', {roomId})
}

export const playToggleRoom = () => {
    socket.emit('togglePlay', {})
}

export const getPublicRooms = (setPublicRooms) => {
    socket.on('setPublicRooms', ({rooms}) => {
        setPublicRooms(rooms)
    })
    socket.emit('getPublicRooms', {})
}


export default socket