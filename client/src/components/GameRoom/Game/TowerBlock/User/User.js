import React from 'react'
import { useEffect } from 'react'
import { loadStyles } from '../../../../../utils/functions/loadStyles.js'

const User = (props) => {

    useEffect(() => {
        var index = props.index !== undefined ? props.index : 0
        const user_doc = window.frames[index].document

        loadStyles(user_doc, 'TowerBlock')

        const start = require('../../../../../utils/socket/games/TowerBlock/user.js').default
        start(index)    
    }, [])
    
    return (
        <div id="container">
            <div id="game"></div>
            <div id="score">0</div>
            <div id="instructions">Click (or press the spacebar) to place the block</div>
            <div className="game-over">
                <h2>Game Over</h2>
            </div>
            <div className="game-ready">
                <div id="start-button">Start</div>
                <div></div>
            </div>
        </div>
    )
}

export default User
