const socketHextris = (io, client, socket) => {
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
        client.ready = false
        var allEnd = true
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

    client.on('newBlock', ({blocklane, color, iter, distFromHex, settled}) => {
        client.broadcast.to(socket.roomId).emit('opponentBlock', {blocklane, color, iter, distFromHex, settled})
    })

    client.on('settledBlocks', ({blocks, newScore}) => {
        client.broadcast.to(socket.roomId).emit('opponentSettled', {blocks, newScore})
    })

    client.on('leftKeyDown', () => {
        client.broadcast.to(socket.roomId).emit('opponentLeftKeyDown', {})
    })
    
    client.on('rightKeyDown', () => {
        client.broadcast.to(socket.roomId).emit('opponentRightKeyDown', {})
    })

    client.on('downKeyDown', () => {
        client.broadcast.to(socket.roomId).emit('opponentDownKeyDown', {})
    })

    client.on('enterKeyDown', () => {
        client.broadcast.to(socket.roomId).emit('opponentEnterKeyDown', {})
    })

    client.on('downKeyUp', () => {
        client.broadcast.to(socket.roomId).emit('opponentDownKeyUp', {})
    })

}

export default socketHextris