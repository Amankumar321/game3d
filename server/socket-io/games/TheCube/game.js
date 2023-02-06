const socketTheCube = (io, client, socket) => {
    client.ready = false
    client.finish = true
    var gameRunning = false    

    client.on('gameReady', () => {
        client.ready = true
        client.finish = false
        client.broadcast.to(socket.roomId).emit('opponentReady', {})

        var allReady = true
        const clients = io.sockets.adapter.rooms.get(socket.roomId)
        for (const clientId of clients) {
            const clientInfo = io.sockets.sockets.get(clientId)
            if (!clientInfo.ready && clientInfo.isPlaying) {
                allReady = false
            }
        }
        if (allReady) {
            gameRunning = true
            io.to(socket.roomId).emit('allReady', {})
            for (const clientId of clients) {
                const clientInfo = io.sockets.sockets.get(clientId)
                clientInfo.ready = false
            }
        }
    })

    client.on('gameStart', ({newPos}) => {
        client.broadcast.to(socket.roomId).emit('opponentStart', {newPos})
    })

    client.on('gameEnd', () => {
        client.finish = true
        var allEnd = true
        client.ready = false
        const clients = io.sockets.adapter.rooms.get(socket.roomId)
        for (const clientId of clients) {
            const clientInfo = io.sockets.sockets.get(clientId)
            if (!clientInfo.finish && clientInfo.isPlaying) {
                allEnd = false
            }
        }
        if (allEnd) {
            gameRunning = false
            io.to(socket.roomId).emit('allEnd', {})
            for (const clientId of clients) {
                const clientInfo = io.sockets.sockets.get(clientId)
                clientInfo.finish = true
            }
        }
    })
    
    client.on('rotateLayer', ({ rotation, flipAxis, flipLayer }) => {
        client.broadcast.to(socket.roomId).emit('opponentLayer', { rotation, flipAxis, flipLayer })
    })

    client.on('rotateCube', ({ rotation, flipAxis }) => {
        client.broadcast.to(socket.roomId).emit('opponentCube', { rotation, flipAxis })
    })

    client.on('savePref', ( preferences ) => {
        client.broadcast.to(socket.roomId).emit('opponentPref',  preferences )
    })

    client.on('initMoves', ({ moves }) => {
        client.broadcast.to(socket.roomId).emit('opponentInit',  { moves } )
    })
}

export default socketTheCube