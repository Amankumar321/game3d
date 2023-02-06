import React from 'react'
import { useEffect } from 'react'
import { loadStyles } from '../../../../../utils/functions/loadStyles.js'

const Opponent = (props) => {
    
    useEffect(() => {
        const user_doc = window.frames[props.index].document
        
        loadStyles(user_doc, 'TowerBlock')

        const start = require('../../../../../utils/socket/games/TowerBlock/opponent.js').default
        start(props.index)    
    }, [])

    return (
        <div id="container">
            <div id="game"></div>
            <div id="score">0</div>
            <div className="game-over">
                <h2>Game Over</h2>
            </div>
            <div className="game-ready">
                <div id="start-button">Not Ready</div>
                <div></div>
            </div>         
        </div>
    )
}

export default Opponent
