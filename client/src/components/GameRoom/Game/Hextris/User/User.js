import React from 'react'
import { useEffect } from 'react'
import { loadStyles } from '../../../../../utils/functions/loadStyles.js'

const User = (props) => {

    useEffect(() => {
        var index = props.index !== undefined ? props.index : 0
        const user_doc = window.frames[index].document

        loadStyles(user_doc, 'Hextris')
        
        const start = require('../../../../../utils/socket/games/Hextris/user.js').default
        start(index)    
    }, [])

    return (
        <div>
            <canvas id="canvas"></canvas>
            <div id="overlay" className="faded overlay"></div>
            <div id='startBtn'><div id='startArrow'>&#x25B4;</div><div id='playAlert'>Play</div></div>
            <div id="helpScreen" className='unselectable'>
                <div id='inst_main_body'></div>
            </div>
            <div className="faded overlay"></div>
            <img id="pauseBtn"/>
            <img id='restartBtn'/>
            <div id='HIGHSCORE'></div>
            <div id='highScoreInGameText'>
                <div id='highScoreInGameTextHeader'></div><div id='currentHighScore'></div>
            </div>
            <div id="gameoverscreen">
                <div id='container'>
                    <div id='gameOverBox' className='GOTitle'>GAME OVER</div>
                    <div id='cScore'></div>
                </div>
                <div id='bottomContainer'>
                    <img id='restart'/>
                    <div id='buttonCont'>      
                    </div>
                </div>
            </div>
        </div>
            
    )
}

export default User
