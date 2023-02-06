import React from 'react'
import { AppBar, Button, Toolbar, Avatar, Typography, Input, FormControlLabel, Checkbox } from '@material-ui/core'
import { Link, useHistory, useLocation } from 'react-router-dom'
import useStyles from './style'
import default_avatar from "../../../assets/images/default.jpg"
import { useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import socket from '../../../utils/socket/main'
import { checkroom } from '../../../redux/actions/room'
import viewProfile from '../../../utils/functions/viewProfile'
import { verifyRoomId, verifyRoomPassword } from '../../../utils/functions/verifyInput'


const MainChat = ({type, chats, users}) => {
    const [user, setUser] = useState(localStorage.getItem('token'))
    const [username, setUsername] = useState(localStorage.getItem('username'))
    const [avatar, setAvatar] = useState(localStorage.getItem('image'))
    const [roomId, setRoomId] = useState(localStorage.getItem('room_id'))
    const [groupId, setGroupId] = useState(localStorage.getItem('group_id'))
    const classes = useStyles()
    const history = useHistory()
    const dispatch = useDispatch()
    const location = useLocation()


    const sendMessage = () => {
        if (document.getElementById('chatInput')) {
            var text = document.getElementById('chatInput').value
            socket.emit('chatMessage', {text, type})
            document.getElementById('chatInput').value = ''
        }
    }

    const addEvListener = (ev) => {
        if (ev.key === 'Enter') {
            sendMessage()
        }
    }

    const toggleUserList = () => {
        const ele = document.getElementById('chatUserList')
        var bottom = document.getElementById('chatFooter').offsetTop
        var offset = document.getElementById('chatHeader').offsetTop + document.getElementById('chatHeader').offsetHeight

        ele.style.height = `${bottom - offset}px`
        ele.style.top = `${offset}px`
        
        if (ele.style.display === 'block') {
            ele.style.display = 'none'
        }
        else {
            socket.emit('chatUserList', {type})
            ele.style.display = 'block'
        }
    } 

    useEffect(() => {
        if (document.getElementById('chatWrap')) {
            document.getElementById('chatWrap').scrollTop = document.getElementById('chatWrap').scrollHeight
        }
    }, [chats.length])

    useEffect(() => {
        document.addEventListener('keyup', addEvListener)
        return () => {
            document.removeEventListener('keyup', addEvListener)
        }
    }, [type])

    return (
        type == '' ? 
        
        <div className={classes.startContainer}>
            <div className={classes.startType}>
                <div className={classes.startHeading}>
                    Global
                </div>
                <div className={classes.startDescription}>
                    Free to all chat. No signup required. People from all around the globe are connected in 
                    this chat. You will be chatting as a guest if you are not logged in. Explore the opportunity
                    to meet new people !
                </div>
            </div>
            <div className={classes.startType}>
                <div className={classes.startHeading}>
                    Room
                </div>
                <div className={classes.startDescription}>
                    Private chat for members of a room. You need to be signed in to join a room or create a new 
                    room. Keep chatting with ur friends while you play against them !
                </div>
            </div>
        </div>

        : (type == 'Global' || type == 'Room' && roomId || type == 'Group' && groupId ?
    
        <div className={classes.mainContainer}>
            <div className={classes.header} id='chatHeader'>
                <i className={`${classes.usericon} fas fa-users`} onClick={toggleUserList}></i>
            </div>
            <div className={classes.chatItemBox} id='chatItemBox'>
                
                <div className={classes.userList} id='chatUserList'>
                        {
                            users.map((e) => {
                                return (
                                    <div className={classes.userListItem} onClick={(mouse) => {viewProfile(e.uname, mouse)}}>
                                        <img className={classes.userListAvatar} src={e.image !== 'null' ? e.image : default_avatar}></img>
                                        <div className={classes.userListName}>{e.uname}</div>
                                    </div>
                                )
                            })
                        }
                    
                </div>
                <div className={classes.chatWrap} id='chatWrap'>
                    {
                        chats.map((e) => {
                            var date = new Date(e.timestamp)
                            var timestamp = date.toString().slice(4,9) + ', ' + date.toString().slice(16, 21)
                            return(
                                <div className={classes.chatItem}>
                                    <img className={classes.chatItemAvatar} src={e.image !== 'null' ? e.image : default_avatar} onClick={(mouse) => {viewProfile(e.username, mouse)}}></img>
                                    <div className={classes.content}>
                                        <div className={classes.chatItemDetail}>
                                            <div className={classes.chatItemUser}>{e.username}</div>
                                            <div className={classes.chatItemTime}>{timestamp}</div>
                                        </div>
                                        <div className={classes.chatItemMsg}>{e.text}</div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <div className={classes.footer} id='chatFooter'>
                <input className={classes.chatInput} id='chatInput' maxLength='150'/>
                <i className={`${classes.sendicon} fas fa-arrow-circle-right`} onClick={sendMessage}></i>    
            </div>
        </div>
        
        : (type == 'Room' && !roomId ? 
        
        <JoinRoomChat classes={classes} ></JoinRoomChat>

        //: (type == 'Group' && !groupId ?

        // <div>
        //     Join a group
        // </div>

        : <div></div>
    
    )))
}



const JoinRoomChat = (props) => {
    const classes = props.classes
    const [joinCheckbox, setJoinCheckbox] = useState(false)
    const dispatch = useDispatch()
    
    const handleJoinCheckbox = () => {
        setJoinCheckbox(value => !value)
    }

    const joinRoom = () => {
        const roomId = document.getElementById('roomIdInput2').value
        const roomPassword = document.getElementById('joinPasswordInput2').value
        if (!verifyRoomId(roomId)) return
        if (roomId !== '') {
            if (joinCheckbox) {
                if (!verifyRoomPassword(roomPassword)) return
                dispatch(checkroom(roomId, roomPassword))
            }
            else {
                dispatch(checkroom(roomId))
            }
        }
    }

    return (
        <div className={classes.startContainer}>
            <div className={classes.textCenter}>
                Join a room to start chatting.
            </div>
            <div className={classes.formJoin}>
                <div className={classes.formContainer}>
                    <div className={classes.inputDiv}>
                        <Input id='roomIdInput2' placeholder='Room ID' name="roomId" label="RoomId" type="text" spellCheck={false} />
                        <Input id='joinPasswordInput2' placeholder='Password' type="text" name="joinPassword" label="Join Password" />
                    </div>
                    <FormControlLabel className={classes.checkbox} label='Use Password' control={<Checkbox onChange={handleJoinCheckbox} color='primary' />}>
                    </FormControlLabel>
                </div>
                <Button className={classes.buttonRoom} variant='contained' onClick={joinRoom}>Join Room</Button>
            </div>
        </div>
    )
}


export default MainChat
