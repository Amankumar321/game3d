import { Button, Typography } from '@material-ui/core';
import React from 'react'
import Auth from '../../Auth/Auth';
import useStyles from './style.js'
import { useEffect } from 'react';
import { showLoginComponent } from '../../../utils/functions/showLoginComponent';
import SoloPlay from '../../SoloPlay/SoloPlay';
import { useState } from 'react';

const NewHome = () => {
    const classes = useStyles()
    const [soloType, setSoloType] = useState('')

    const showSignUpComponent = () => {
        //document.getElementById('authSwitchBtn').click()
        showLoginComponent('signup')
    }

    const showSignInComponent = () => {
        showLoginComponent('signin')
    }
    
    const soloPlay = (type) => {
        setSoloType(type)
    }

    useEffect(() => {
        if (soloType !== '') {
            document.body.style.overflow = 'hidden';
            var elem = document.getElementById('soloPlayContainer')
            //var frame = document.getElementById('homeCoverFrame')
            if (elem) {
                //elem.style.display = 'block'
                //frame.style.display = 'none'
            }
        }
    }, [soloType])


    return (
        <div className={classes.mainContainer} id='mainNewHome'>
            {
                soloType !== '' ?
                <SoloPlay type={soloType} setSoloType={setSoloType} />
                : <div className={classes.topDiv}>
                    <div className={classes.content} id='contentDivHome'>
                        <div className={classes.phrase}>
                            Play online games in your browser
                        </div>
                        <div className={classes.desc}>
                            Its as easy as creating a room and sharing the room id
                            with your friends. You can also chat with people around globe without logging in. 
                        </div>
                        <div className={classes.login}>
                            <Button className = {classes.buttonSignUp} onClick={showSignUpComponent} variant="contained">Sign Up</Button>
                            <Button className = {classes.buttonLogin} onClick={showSignInComponent}>Login</Button>
                        </div>
                    </div>
                    <iframe id='homeCoverFrame' src='/homecover/cover.html' className={classes.coverFrame}></iframe>
                </div>
            }
            
            <div className={classes.secondDiv}>
                <div className={classes.checkoutGames}>
                    <div className={classes.heading}>
                        Play Solo
                    </div>
                    <div className={classes.checkoutWrap}>
                        <div className={classes.checkoutCard}>
                            <div className={classes.checkoutNameOuter}>
                                <div className={classes.checkoutNameInner}>
                                    Tower Block
                                </div>
                                <Button className={classes.checkoutBtn} onClick={()=>soloPlay('TowerBlock')}>Checkout</Button>
                            </div>
                            <div className={classes.checkoutGifDiv}>
                                <img className={classes.checkoutGif} src='/defaults/TowerBlock.png'></img>
                            </div>
                        </div>
                        <div className={classes.checkoutCard}>
                            <div className={classes.checkoutNameOuter}>
                                <div className={classes.checkoutNameInner}>
                                    The Cube
                                </div>
                                <Button className={classes.checkoutBtn} onClick={()=>soloPlay('TheCube')}>Checkout</Button>
                            </div>
                            <div className={classes.checkoutGifDiv}>
                                <img className={classes.checkoutGif} src='/defaults/TheCube.png'></img>
                            </div>
                        </div>
                        <div className={classes.checkoutCard}>
                            <div className={classes.checkoutNameOuter}>
                                <div className={classes.checkoutNameInner}>
                                    Hextris
                                </div>
                                <Button className={classes.checkoutBtn} onClick={()=>soloPlay('Hextris')}>Checkout</Button>
                            </div>
                            <div className={classes.checkoutGifDiv}>
                                <img className={classes.checkoutGif} src='/defaults/Hextris.png'></img>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      );
}

export default NewHome