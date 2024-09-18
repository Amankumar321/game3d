import { Avatar, Typography, LinearProgress } from '@mui/material'
import React from 'react'
import { useState } from 'react'
import useStyles from './style.js'
import default_avatar from "../../assets/images/default.jpg"
import { editProfileImage, getProfile, editProfile } from '../../api/index.js'
import { useEffect } from 'react'
import EditPopup from './EditPopup/EditPopup.js'
import { displayError } from '../../utils/functions/displayError.js'


const Profile = (props) => {
    const username = localStorage.getItem('username')
    const classes = useStyles()
    const [profile, setProfile] = useState({})
    const [editType, setEditType] = useState('')
    const [needUpdate, setNeedUpdate] = useState(0)
    const [initial, setInitial] = useState('')
    const [progress, setProgress] = useState(0)
    const [isUploading, setIsUploading] = useState(false)

    const viewUser = props.user
    
    const closeProfilePage = () => {
        document.getElementById('profilePage').style.display = 'none'
        document.getElementById('mainProfileContainer').style.overflow = 'auto'
    }

    const init = () => {
        getProfile(viewUser).then(({data}) => {
            setProfile(({...data}.profile))
            document.getElementById('profilePage').style.display = 'block'
        }).catch((error) => {
            if (error.response.status === 404) {
                displayError('NoProfileError')
            }
            if (error.response.status === 500) {
                displayError('UnknownError')
            }
        })
    }

    useEffect(() => {
        if (profile.image !== undefined && username === viewUser) {
            localStorage.setItem('image', profile.image)
            props.setAvatar(profile.image)
        }
    }, [{...profile}])
    
    useEffect(() => {
        init()
        document.getElementById('editProfilePopup').style.display = 'none'
        document.getElementById('zoomCoverDiv').style.display = 'none'
        document.getElementById('zoomAvatarDiv').style.display = 'none'
        document.getElementById('mainProfileContainer').style.overflow = 'auto'
    }, [props.user, needUpdate])

    const editPopup = (attr) => {
        if (attr === 'Status') {
            setInitial(profile.status)
        }
        if (attr === 'AboutMe') {
            setInitial(profile.about)
        }
        setEditType(attr)
        document.getElementById('editProfilePopup').style.display = 'block'
        document.getElementById('mainProfileContainer').style.overflow = 'hidden'
    }

    const removePic = (attr) => {
        editProfile({ type: attr, value: 'null' }, username)
        if (attr === 'Image') {
            setProfile(profile => { return {...profile, image: 'null'} })
            document.getElementById('viewProfileImage').setAttribute('src', 'null')
        }
        if (attr === 'Cover') {
            setProfile(profile => { return {...profile, cover: 'null'} })
            document.getElementById('viewProfileCover').setAttribute('src', 'null')
        }
    }

    useEffect(() => {
    }, [needUpdate])

    const uploadPic = (attr) => {
        setEditType(attr)
        if (attr === 'Image') {
            document.getElementById('imageUpload').click()
            setEditType('Image')
        }
        else if (attr === 'Cover') {
            document.getElementById('coverUpload').click()
            setEditType('Cover')
        }
    }

    const handleInputChange = (e) => {
        const file = e.target.files[0]
        if (file.size > 1024 * 1024 * 3) {
            displayError('FileTooBigError')
            return
        }
        const formData = new FormData()
        formData.append('file', file)
        setIsUploading(true)
        editProfileImage(formData, editType, username, setProgress).then((v) => {
            setIsUploading(false)
            init()
        }).catch((error) => {
            setIsUploading(false)
            if (error.response.status === 500) {
                displayError('ImageUploadError')
            }
        })
    }

    const zoomCover = () => {
        if (profile.username === undefined) return
        if (profile.cover === 'null') return
        const ele = document.getElementById('zoomCoverDiv')
        const parent = document.getElementById('mainProfileContainer')
        const overlay = document.getElementById('zoomImageOverlay')
        ele.style.display = 'flex'
        overlay.style.display = 'block'

        ele.style.top = `${parent.scrollTop + parent.offsetHeight/2 + 40}px`
        overlay.style.top = `${parent.scrollTop}px`
        document.getElementById('mainProfileContainer').style.overflow = 'hidden'
    }

    const zoomAvatar = () => {
        if (profile.username === undefined) return
        const ele = document.getElementById('zoomAvatarDiv')
        const parent = document.getElementById('mainProfileContainer')
        const overlay = document.getElementById('zoomImageOverlay')
        ele.style.display = 'flex'
        overlay.style.display = 'block'

        ele.style.top = `${parent.scrollTop + parent.offsetHeight/2 + 40}px`
        overlay.style.top = `${parent.scrollTop}px`
        document.getElementById('mainProfileContainer').style.overflow = 'hidden'
    }

    const closeZoomCover = () => {
        const overlay = document.getElementById('zoomImageOverlay')
        overlay.style.display = 'none'
        document.getElementById('zoomCoverDiv').style.display = 'none'
        document.getElementById('mainProfileContainer').style.overflow = 'auto'
    }

    const closeZoomAvatar = () => {
        const overlay = document.getElementById('zoomImageOverlay')
        overlay.style.display = 'none'
        document.getElementById('zoomAvatarDiv').style.display = 'none'
        document.getElementById('mainProfileContainer').style.overflow = 'auto'
    }


    return (
        <div>
            <div className={classes.overlay} id='profileOverlay'></div>
            <div className={classes.mainContainer} id='mainProfileContainer'>
                <div className={classes.overlay2} id='zoomImageOverlay'></div>
                <div className={classes.zoomCoverDiv} id='zoomCoverDiv'>
                    <div className={classes.closeProfileBtn}>
                        <i className={`${classes.closeIcon} fas fa-times`} onClick={() => {closeZoomCover()}}></i>
                    </div>
                    <img className={classes.zoomCover} src={profile.cover !== 'null' ? profile.cover : null}></img>
                </div>
                
                <div className={classes.zoomAvatarDiv} id='zoomAvatarDiv'>
                    <div className={classes.closeProfileBtn}>
                        <i className={`${classes.closeIcon} fas fa-times`} onClick={() => {closeZoomAvatar()}}></i>
                    </div>
                    <img id='viewProfileImage' className={classes.zoomAvatar} src={profile.image !== 'null' ? profile.image : default_avatar}></img>
                </div>
                
                <EditPopup type={editType} setNeedUpdate={setNeedUpdate} initial={initial} />
                
                <div className={classes.profile}>
                    <div className={classes.cover}>
                        {
                            isUploading === true && editType === 'Cover' ?
                            <div className={classes.coverProgressDiv}>
                                <LinearProgress color='primary' />
                            </div>
                            : null
                        }
                        <div className={classes.closeProfileBtn}>
                            <i className={`${classes.closeIcon} fas fa-times`} onClick={() => {closeProfilePage()}}></i>
                        </div>
                        <img id='viewProfileCover' className={classes.coverImg} src={profile.cover !== 'null' ? profile.cover : null} onClick={zoomCover}></img>
                        <div className={classes.container}>
                                {
                                    username === profile.username ? 

                                    <div className={classes.editAvatarDiv}>
                                        <input type='file' id='imageUpload' style={{display: 'none'}} onChange={(e) => {handleInputChange(e)}}></input>
                                        <i className={`${classes.imageIcon} fas fa-camera`} onClick={() => {uploadPic('Image')}}></i>
                                        <i className={`${classes.imageIcon} fas fa-times`} onClick={() => {removePic('Image')}}></i>
                                    </div>

                                    : null
                                }
                                {
                                    isUploading === true && editType === 'Image' ?
                                    <div className={classes.imageProgressDiv}>
                                        <LinearProgress color='primary' />
                                    </div>
                                    : null
                                }
                            <Avatar className={classes.avatar} alt={username} src={profile.image !== 'null' ? profile.image : default_avatar} onClick={zoomAvatar}>
                            </Avatar>
                            <Typography className={classes.username} variant='h2'>{profile.username}</Typography>  
                        </div>
                        {
                            username === profile.username ?

                            <div className={classes.editCoverDiv}>
                                <input type='file' id='coverUpload' style={{display: 'none'}} onChange={(e) => {handleInputChange(e)}}></input>
                                <i className={`${classes.imageIcon} fas fa-camera`} onClick={() => {uploadPic('Cover')}}></i>
                                <i className={`${classes.imageIcon} fas fa-times`} onClick={() => {removePic('Cover')}}></i>
                            </div>

                            : null
                        }
                    </div>
                    <div className={classes.space}></div>
                    <div className={classes.info}>
                        <div className={classes.mainInfo}>
                            <div className={classes.infoCouple}>
                                <div className={classes.infoItem}>
                                    <div className={classes.heading}>
                                        Age
                                        <div className={classes.editBtn}>
                                            {username === profile.username ? <i onClick={() => {editPopup('Age')}}>edit</i> : <div></div>}
                                        </div>
                                    </div>
                                    <div className={classes.content}>{profile.age === 0 ? 'Unknown' : (profile.age === undefined ? '' : `${profile.age} years old`)}</div>
                                </div>
                                <div className={classes.infoItem}>
                                    <div className={classes.heading}>
                                        Gender
                                        <div className={classes.editBtn}>
                                            {username === profile.username ? <i onClick={() => {editPopup('Gender')}}>edit</i> : <div></div>}
                                        </div>
                                    </div>
                                    <div className={classes.content}>{profile.gender}</div>
                                </div>
                            </div>
                            <div className={classes.infoCouple}>
                                <div className={classes.infoItem}>
                                    <div className={classes.heading}>
                                        Location
                                        <div className={classes.editBtn}>
                                            {username === profile.username ? <i onClick={() => {editPopup('Location')}}>edit</i> : <div></div>}
                                        </div>
                                    </div>
                                    <div className={classes.content}>{profile.location}</div>
                                </div>
                                <div className={classes.infoItem}>
                                    <div className={classes.heading}>
                                        Joined
                                    </div>
                                    <div className={classes.content}>{profile.dateJoined}</div>
                                </div>
                            </div>
                        </div>
                        <div className={classes.otherInfo}>
                            <div className={classes.statusDiv}>
                                <div className={classes.heading}>
                                    Status
                                    <div className={classes.editBtn}>
                                        {username === profile.username ? <i onClick={() => {editPopup('Status')}}>edit</i> : <div></div>}
                                    </div>
                                </div>
                                <div className={classes.content}>{profile.status}</div>
                            </div>
                            <div className={classes.aboutDiv}>
                                <div className={classes.heading}>
                                    About Me
                                    <div className={classes.editBtn}>
                                        {username === profile.username ? <i onClick={() => {editPopup('AboutMe')}}>edit</i> : <div></div>}
                                    </div>
                                </div>
                                <div className={`${classes.content} ${classes.aboutMe}`}>{profile.about}</div>
                            </div>
                        </div>
                    </div>  
                </div>
            </div>
        </div>
    )
}

export default Profile
