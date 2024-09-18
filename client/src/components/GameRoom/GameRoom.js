import { Button, Select, MenuItem, FormControl, InputLabel, Switch, FormControlLabel } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router'
import { useEffect, useState } from 'react'
import Navbar from '../Navbar/Navbar.js';
import Game from './Game/Game.js';
import socket, { roomsocket, updateType, publicToggleRoom, playToggleRoom } from '../../utils/socket/main.js';
import checkAuth from '../../utils/functions/checkAuth.js';
import useStyles from './style.js'
import { displayError } from '../../utils/functions/displayError.js';


const GameRoom = () => {
    
    const history = useNavigate()
    const [roomId, setRoomId] = useState(localStorage.getItem('room_id'))
    const [username, setUsername] = useState(localStorage.getItem('username'))
    const [gameType, setGameType] = useState('')
    const [userList, setUserList] = useState([])
    const [publicStatus, setPublicStatus] = useState(false)
    const [playStatus, setPlayStatus] = useState(false)
    const classes = useStyles()

    checkAuth(history)
    if (!roomId) {
        history('/')
    }
    
    const goHome = () => {
        socket.emit('exitRoom', {})
        localStorage.removeItem('room_id')
        history('/')
    }
    
    useEffect(() => {
        roomsocket(setUserList, setGameType, setPublicStatus)
    }, [])

    const handleTypeChange = (e) => {
        updateType('')
        setTimeout(() => {
            setGameType(e.target.value)
            updateType(e.target.value)
        }, 200);
    }

    const copyRoomId = () => {
        const elem = document.createElement('textarea');
        elem.value = roomId;
        document.body.appendChild(elem);
        elem.focus();
        elem.select();
        try {
            document.execCommand('copy');
            displayError('RoomIdCopied')
        }
        catch(e) {
            
        }
        document.body.removeChild(elem);  
    }

    const handlePublic = () => {
        publicToggleRoom()
    }

    const handlePlay = () => {
        if (gameType === '') {
            if (userList.length < 2 || playStatus === true) {
                setPlayStatus(val => !val)
                playToggleRoom()
            }
            else {
                displayError('PlayersFullError', {userList: userList})
            }
        }
    }

    return (
        <div>
            <Navbar />
            <div className={classes.mainContainer}>
                <div className={classes.view}>
                    <div className={classes.header}>
                        <div className={classes.roomIdWrap}>
                            <div className={classes.roomId}>
                                <div className={classes.roomIdFirst}>
                                    Room id:
                                </div>
                                <div className={classes.roomIdSecond}>
                                    <span id='roomIdSpan'>{roomId}</span>
                                    <div className={classes.copyIcon}>
                                        <icon className={`far fa-clipboard`} onClick={copyRoomId}></icon>
                                    </div>  
                                </div>
                            </div>
                            <FormControlLabel className={classes.playSwitchOne} control={<Switch checked={playStatus} onChange={handlePlay} color='primary' />} label='Play'></FormControlLabel>
                        </div>
                        <div className={classes.roomSettings}>
                            <div className={classes.settingForms}>
                                <FormControl className={classes.formType}>
                                    <InputLabel>Type</InputLabel>
                                    <Select label="Type" value={gameType} onChange={handleTypeChange}>
                                        <MenuItem value={'TowerBlock'}>Tower Block</MenuItem>
                                        <MenuItem value={'TheCube'}>The Cube</MenuItem>
                                        <MenuItem value={'Hextris'}>Hextris</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControlLabel className={classes.playSwitchTwo} control={<Switch checked={playStatus} onChange={handlePlay} color='primary' />} label='Play'></FormControlLabel>
                                <FormControlLabel className={classes.publicSwitch} control={<Switch checked={publicStatus} onChange={handlePublic} color='primary' />} label='Public Room'></FormControlLabel>
                            </div>
                            <div className={classes.settingBtn}>
                                <Button variant='contained' className={classes.roomBtn} onClick={() => {updateType('')}}>
                                    End Game
                                </Button>
                                <Button variant='contained' className={classes.roomBtn} onClick={goHome}>
                                    Exit Room
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className={classes.playerDiv}>
                        <FormControlLabel className={classes.playSwitchThree} control={<Switch checked={playStatus} onChange={handlePlay} color='primary' />} label='Play'></FormControlLabel>
                    </div>
                    <div className={classes.gameBox} bgcolor='red'>
                        {
                            gameType !== '' ? (
                                <Game username={username} users={userList} type={gameType} />
                            )
                            : 
                            <div className={classes.noGameDiv}>
                                <div className={classes.instructionDiv}>
                                    <div className={classes.instructionHead}>Share</div>
                                    <div className={classes.instructionBody}>
                                        Click on
                                        &nbsp;<icon className={`far fa-clipboard`} onClick={copyRoomId}></icon>&nbsp;
                                        to copy the link and share it with anyone
                                    </div>
                                </div>
                                <div className={classes.instructionDiv}>
                                    <div className={classes.instructionHead}>Type</div>
                                    <div className={classes.instructionBody}>
                                        Dropdown menu for selecting the type of game.
                                        Changing type while playing will end current gameplay.
                                    </div>
                                </div>
                                <div className={classes.instructionDiv}>
                                    <div className={classes.instructionHead}>Play</div>
                                    <div className={classes.instructionBody}>
                                        Slider for opting in or out of matches. Maximum two players
                                        can opt in. Without opting in you will only be able to watch.
                                    </div>
                                </div>
                                <div className={classes.instructionDiv}>
                                    <div className={classes.instructionHead}>Public</div>
                                    <div className={classes.instructionBody}>
                                        Toggling public visibility status of this room.
                                        If turned on, this room will be publicly visible. Rooms with
                                        password cannot be public.
                                    </div>
                                </div>
                                <div className={classes.instructionDiv}>
                                    <div className={classes.instructionHead}>End Game</div>
                                    <div className={classes.instructionBody}>
                                        Button for terminating gameplay instantly during match.
                                    </div>
                                </div>
                                <div className={classes.instructionDiv}>
                                    <div className={classes.instructionHead}>Exit Room</div>
                                    <div className={classes.instructionBody}>
                                        Button for exiting out of the room.
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GameRoom
