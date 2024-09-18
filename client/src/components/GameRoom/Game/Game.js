import React, { useEffect } from 'react'
import { useState } from 'react';
import Frame from 'react-frame-component'
import useStyles from './style.js'


const Game = (props) => {
    const type = props.type
    const classes = useStyles({type})
    const users = [...props.users]

    var frames = props.users;
    if (frames.includes(props.username)) {
        frames.splice(frames.indexOf(props.username), 1)
    }

    const User = require(`./${props.type}/User/User.js`).default
    const Opponent = require(`./${props.type}/Opponent/Opponent.js`).default

    const getFrame = (user, index) => {
        return (  
            <div style={{position: 'relative'}}>
                <Tag name={user} type={type} index={index} />
                <FullScreen type={type} index={index} />    
                <Frame className={classes.gameFrame} id={`frameIndex${index}`} frameBorder='0' scrolling='no'>
                    <Opponent user={user} index={index} />
                </Frame>
            </div>
        )
    }


    return (
        <div id='frames' className={classes.frames}>
            {
                users.includes(props.username) ?
                (
                    <div style={{position: 'relative'}}>
                        <FullScreen type={type} index={0} />    
                        <Frame className={classes.gameFrame} id='frameIndex0' frameBorder='0' scrolling='no'>
                            <User />
                        </Frame>
                    </div>
                ) : null
            }
            {   
                frames.length > 0 ? (
                    getFrame(frames[0], 0 + (users.includes(props.username) ? 1 : 0))
                ) : null
            }
        </div>
    )        
    
}


const Tag = ({name, type, index}) => {
    const classes = useStyles({type}) 

    return (
        <div className={classes.tagNameOuter} id={`tagIndex${index}`}>
            <div className={classes.tagNameInner}>
                {name}
            </div>
        </div>
    )
}

const FullScreen = ({type, index}) => {
    const classes = useStyles({type}) 
    const [fullScreen, setFullScreen] = useState(false)
    const [oldH, setOldH] = useState('')
    const [oldW, setOldW] = useState('')

    const toggleFullScreen = () => {
        const elem = document.getElementById(`frameIndex${index}`)
        const icon = document.getElementById('resizeIcon')

        if (!fullScreen) {
            setOldH(elem.style.height)
            setOldW(elem.style.width)
            elem.style.height = `calc(100% - 84px)`
            elem.style.width = 'calc(100vw - 20px)'
            elem.style.position = 'fixed'
            elem.style.zIndex = 5
            document.body.style.overflow = 'hidden'
            setFullScreen(true)
            if (document.getElementById(`tagIndex${index}`)) {
                document.getElementById(`tagIndex${index}`).style.display = 'none'
            }
        }
        else {
            document.body.style.overflow = 'auto'
            elem.style.height = `${oldH}`
            elem.style.width = `${oldW}`
            elem.style.position = 'static'
            elem.style.zIndex = 1
            setFullScreen(false)
            if (document.getElementById(`tagIndex${index}`)) {
                document.getElementById(`tagIndex${index}`).style.display = 'flex'
            }
        }
    }

    return (
        <div id='resizeIcon'>
            {
                fullScreen !== true ?
                <div className={classes.fullScreenDiv} onClick={toggleFullScreen}>
                    <i className={`fas fa-expand ${classes.fullScreenIcon}`}></i>
                </div>
                :
                <div className={classes.minScreenDiv} onClick={toggleFullScreen}>
                    <i className={`fas fa-compress ${classes.fullScreenIcon}`}></i>
                </div>
            }
        </div>
    )
}



export default Game
