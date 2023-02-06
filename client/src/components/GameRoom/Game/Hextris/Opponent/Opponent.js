import React from 'react'
import { useEffect } from 'react'
import { loadStyles } from '../../../../../utils/functions/loadStyles.js'

const Opponent = (props) => {

    useEffect(() => {
        const user_doc = window.frames[props.index].document

        loadStyles(user_doc, 'Hextris')

        const start = require('../../../../../utils/socket/games/Hextris/opponent.js').default
        start(props.index)    
    }, [])

    return (
        <div>
            <canvas id="canvas"></canvas>
            <div id="overlay" className="faded overlay"></div>
            <div id='startBtn'><div id='startArrow'>&#x25B4;</div><div id='playAlert'>Not Ready</div></div>
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

export default Opponent
