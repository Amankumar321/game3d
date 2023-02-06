import { Avatar, Button, Checkbox, Container, FormControlLabel, Input, ThemeProvider, Typography } from '@material-ui/core';
import React from 'react'
import { useState, useEffect } from 'react'
import default_avatar from "../../../assets/images/default.jpg"
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { useTheme } from '@material-ui/core';
import { createroom } from '../../../redux/actions/room';
import { checkroom } from '../../../redux/actions/room'
import useStyles from './style'
import { getPublicRooms } from '../../../utils/socket/main';
import { verifyRoomId, verifyRoomPassword, verifyUsername } from '../../../utils/functions/verifyInput.js';


const ProfileHome = () => {
    const [username, setUsername] = useState(localStorage.getItem('username'))
    const [avatar, setAvatar] = useState(localStorage.getItem('image'))
    const [errorMsg, setErrorMsg] = useState('')
    const history = useHistory()
    const dispatch = useDispatch()
    const theme = useTheme()
    const classes = useStyles()
    const [joinCheckbox, setJoinCheckbox] = useState(false)
    const [createCheckbox, setCreateCheckbox] = useState(false)
    const [publicRooms, setPublicRooms] = useState([])

    
    const createRoom = () => {
        const roomPassword = document.getElementById('createPasswordInput').value
        if (createCheckbox) {
            if (!verifyRoomPassword(roomPassword)) {
                return
            }
            dispatch(createroom(username, roomPassword))
        }
        else {
            dispatch(createroom(username))
        }
    }

    const handleJoinCheckbox = () => {
        setJoinCheckbox(value => !value)
    }

    const handleCreateCheckbox = () => {
        setCreateCheckbox(value => !value)
    }

    const joinRoom = () => {
        const roomId = document.getElementById('roomIdInput').value
        const roomPassword = document.getElementById('joinPasswordInput').value
        if (!verifyRoomId(roomId)) return
        if (roomId !== '') {
            if (joinCheckbox) {
                if (!verifyRoomPassword(roomPassword)) {
                    return
                }
                dispatch(checkroom(roomId, roomPassword))
            }
            else {
                dispatch(checkroom(roomId))
            }
        }
    }

    const joinPublicRoom = (publicId) => {
        dispatch(checkroom(publicId))
    }

    useEffect(() => {
        getPublicRooms(setPublicRooms)
    }, [])


    return (
        <div className={classes.mainDiv}>
            <div className={classes.formAdWrap}>
                <div className={classes.container}>
                    <div className={classes.createRoomBox}>
                        <div className={classes.heading}>Create Room</div>
                        <div className={classes.content}>
                            Create your own room to play games !
                            <ul>
                                <li className={classes.listContent}>Play with friends or just play solo</li>
                                <li className={classes.listContent}>Share room ID with friends to invite them</li>
                                <li className={classes.listContent}>Room ID is valid for 4 hours</li>
                                <li className={classes.listContent}>Chat privately in room</li>
                                <li className={classes.listContent}>Any number of users can be in a room</li>
                            </ul>
                            <div style={{flexGrow: 1}}></div>
                            <div className={classes.formRoom}>
                                <Input id='createPasswordInput' placeholder='Password' type="text" name="createPassword" label="Create Password"/>
                                <FormControlLabel className={classes.checkbox} label='Use Password' control={<Checkbox color='primary' onChange={handleCreateCheckbox} />}>
                                </FormControlLabel><br />
                                <Button className={classes.buttonRoom} variant='contained' onClick={createRoom}>Create Room</Button>
                            </div>
                        </div>
                    </div>
                    <div className={classes.middleSpace}></div>
                    <div className={classes.joinRoomBox}>
                        <div className={classes.heading}>Join Room</div>
                        <div className={classes.content}>
                            Use room ID to join a room !
                            <ul>
                                <li className={classes.listContent}>Join to play with your friends</li>
                                <li className={classes.listContent}>Use the password if the room is private</li>
                                <li className={classes.listContent}>Public rooms can be joined directly</li>
                            </ul>
                            <div style={{flexGrow: 1}}></div>
                            <div className={classes.formRoom}>
                                <Input id='roomIdInput' placeholder='Room ID' name="roomId" label="RoomId" type="text" spellCheck={false} /><br />
                                <Input id='joinPasswordInput' placeholder='Password' type="text" name="joinPassword" label="Join Password" />
                                <FormControlLabel className={classes.checkbox} label='Use Password' control={<Checkbox color='primary' onChange={handleJoinCheckbox} />}>
                                </FormControlLabel><br />
                                <Button className={classes.buttonRoom} variant='contained' onClick={joinRoom}>Join Room</Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={classes.adBlock}></div>
            </div>
            <div className={classes.separator}></div>
            <div className={classes.publicRooms}>
                <div className={classes.publicAdWrap}>
                    <div className={classes.publicRoomsContent}>
                        <div className={`${classes.heading} ${classes.textCenter}`}>Public Rooms</div>
                        {
                            publicRooms.length === 0 ?
                            <div className={classes.publicErrorDiv}>
                                <i className={`${classes.errorIcon} fas fa-exclamation-circle`}></i>
                                No rooms available
                            </div>
                            :
                            <div></div>
                        }
                        <div className={classes.cardGroup}>
                            {
                                publicRooms.map((e) => {
                                    return(
                                        <div className={classes.roomCard}>
                                            <div className={classes.publicOnline}>
                                                <div className={classes.publicOnlineDiv}>
                                                    <i className={`${classes.userIcon} fas fa-user`}></i>
                                                    {e.roomCount}
                                                </div>
                                            </div>
                                            <div className={classes.publicImageDiv}>
                                                <img className={classes.publicImage} src={e.gameType !== '' ? `/defaults/${e.gameType}.png` : '/defaults/idle.png'} alt={e.gameType}></img>
                                            </div>
                                            <div className={classes.publicBottomDiv}>
                                                <div className={classes.publicDescDiv}>
                                                    <div style={{fontWeight: 600}}>Playing:</div>&nbsp;
                                                    {e.gameType ? e.gameType : 'None'}
                                                </div>
                                                <div className={classes.publicBtnDiv}>
                                                    <Button className={classes.publicBtn} variant='contained' onClick={() => joinPublicRoom(e.roomId)}>Join</Button>
                                                </div>                                     
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
      );
}

export default ProfileHome