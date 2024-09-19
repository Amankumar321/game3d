import React from 'react'
import { AppBar, Button, Toolbar, Avatar, Typography, Input, Tabs, Tab, Drawer } from '@material-ui/core/index.js'
import { Link, useHistory, useLocation } from 'react-router-dom'
import useStyles from './style.js'
import default_avatar from "../../assets/images/default.jpg"
import { useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import socket from '../../utils/socket/main.js'
import MainChat from './MainChat/MainChat.js'


var globalchats = []
var roomchats = []
var groupchats = []
var globalusers = []
var roomusers = []
var groupusers = []


const Chat = () => {
    const [user, setUser] = useState(localStorage.getItem('token'))
    const [username, setUsername] = useState(localStorage.getItem('username'))
    const [avatar, setAvatar] = useState(localStorage.getItem('image'))
    const [domain, setDomain] = useState('')
    const classes = useStyles()
    const history = useHistory()
    const dispatch = useDispatch()
    const location = useLocation()
    const [render, setRender] = useState(0)
    
    
    const setdomain = (domain) => {
        setDomain(domain)
        document.getElementById('domainSet').childNodes.forEach((ele) => {
            ele.style.opacity = '0.6'
        })
        document.getElementById(domain).style.opacity = '1'
    }

    useEffect(() => {
        const handleMsg = ({latestChat, type}) => {
            console.log(latestChat);
            if (type === 'Global') {
                var x = globalchats.length >= 20 ? globalchats.shift() : null
                if (globalchats.indexOf(latestChat) === -1) {
                    globalchats.push(latestChat)
                }
            }
            else if (type === 'Room') {
                var x = roomchats.length >= 20 ? roomchats.shift() : null
                if (roomchats.indexOf(latestChat) === -1) {
                    roomchats.push(latestChat)
                }
            }
            else if (type === 'Group') {
                var x = groupchats.length >= 20 ? groupchats.shift() : null
                if (groupchats.indexOf(latestChat) === -1) {
                    groupchats.push(latestChat)
                }
            }
    
            setRender(render => render + 1)
        }

        socket.on('getMessage', handleMsg)
        
        return () => {
            socket.off('getMessage', handleMsg)
        }
    }, [])

    useEffect(() => {
        const handleAddUser = ({user, type}) => {
            if (type === 'Global') {
                globalusers.push(user)
            }
            else if (type === 'Room') {
                roomusers.push(user)
            }
            else if (type === 'Group') {
                groupusers.push(user)
            }

            setRender(render => render + 1)
        }

        const handleRemoveUser = ({user, type}) => {
            if (type === 'Global') {
                globalusers.splice(globalusers.indexOf(user), 1)
            }
            else if (type === 'Room') {
                roomusers.splice(roomusers.indexOf(user), 1)
            }
            else if (type === 'Group') {
                groupusers.splice(groupusers.indexOf(user), 1)
            }

            setRender(render => render + 1)
        }

        socket.on('addUserList', handleAddUser)
        socket.on('removeUserList', handleRemoveUser)

        return () => {
            socket.off('addUserList', handleAddUser)
            socket.on('removeUserList', handleRemoveUser)
        }
    }, [])

    useEffect(() => {
        const handleUserList = ({users, type}) => {
            if (type === 'Global') {
                globalusers = users
            }
            else if (type === 'Room') {
                roomusers = users
            }
            else if (type === 'Group') {
                groupusers = users
            }

            setRender(render => render + 1)
        }

        socket.on('getUserList', handleUserList)
        return () => {
            socket.off('getUserList', handleUserList)
        }
    }, [])

    useEffect(() => {
        const handleGlobalChats = ({chats}) => {
            globalchats = chats
        }

        socket.on('sendGlobalChats', handleGlobalChats)
        socket.emit('getGlobalChats', {})

        return () => {
            socket.off('sendGlobalChats', handleGlobalChats)
        }
    }, [])


    return (
        <div className={classes.mainDiv}>
            <div className={classes.domain} id='domainSet'>
                <div className={classes.domainName} id='Global' onClick={() => {setdomain('Global')}}>
                    &nbsp;Global&nbsp;
                    <div className={classes.underline}></div>
                </div>
                <div className={classes.domainName} id='Room' onClick={() => {setdomain('Room')}}>
                    &nbsp;Room&nbsp;
                    <div className={classes.underline}></div>
                </div>
                {/* <div className={classes.domainName} id='Group' onClick={() => {setdomain('Group')}}>
                    &nbsp;Group&nbsp;
                    <div className={classes.underline}></div>
                </div> */}
            </div>
            <div className={classes.chatBox}>
                {
                    (domain === 'Global' ? <MainChat type='Global' chats={globalchats} users={globalusers} /> :
                    (domain === 'Room' ? <MainChat type='Room' chats={roomchats} users={roomusers} /> :
                    (domain === 'Group' ? <MainChat type='Group' chats={groupchats} users={groupusers} /> :
                        <MainChat type='' chats={[]} users={[]}/>
                    )))
                }
            </div>
            <div className={classes.bottomChat}>
            </div>
        </div>
    )
}

export default Chat
