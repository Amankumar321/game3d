import React from 'react'
import useStyles from './style.js'
import { useEffect } from 'react'

const ErrorBox = () => {
    const classes = useStyles()
    var msg;
    
    const closeErrorBox = () => {
        document.getElementById('errorBox').style.display = 'none'
        document.getElementById('closeErrorDiv').style.display = 'none'
    }

    useEffect(() => {
        msg = document.getElementById('errorBox').getAttribute('msg')
    }, [])

    return (
        <div>
            <div className={classes.mainDiv} id='errorBox' style={{display: 'none', opacity: 1}}>
            </div>
            <div className={classes.closeBtnDiv} id='closeErrorDiv'>
                    <i className={`${classes.closeIcon} fas fa-times`} onClick={() => {closeErrorBox()}}></i>
            </div>
        </div> 
    )
}

export default ErrorBox
