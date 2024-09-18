import React from 'react'
import useStyles from './style.js'
import { useEffect } from 'react'
import { useState } from 'react'
import Frame from 'react-frame-component'

const SoloPlay = (props) => {
    const classes = useStyles()
    const [loaded, setLoaded] = useState(false)
    //alert(document.getElementById('soloPlayContainer').offsetWidth)
    
    const User = require(`../GameRoom/Game/${props.type}/User/User.js`).default
    
    const closeSolo = () => {
        props.setSoloType('')
        //var frame = document.getElementById('homeCoverFrame')
        //frame.style.display = 'block'
        document.body.style.overflow = 'auto';
        //document.getElementById('soloPlayContainer').style.display = 'none'
        document.getElementById('soloPlayContainer').style.display = 'none'
        window.frames[0].document.head.innerHTML = ''
    }
    
    useEffect(() => {
        var elem = document.getElementById('soloPlayContainer')
        if (elem) {
            elem.style.display = 'block'
        }
        setLoaded(true)
    }, [])
        
    return (
        <div className={classes.mainContainer} id='soloPlayContainer'>
            <div className={classes.closeBox} onClick={closeSolo}>
                Close <i className={`${classes.closeIcon} fas fa-times`}></i>
            </div>
            <Frame className={classes.frame} id='soloFrame'>
                    {
                        loaded === true ? 
                        <User index={0} />
                        : null
                    }
            </Frame>
        </div>
    )
}

export default SoloPlay
