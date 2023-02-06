import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import roomRoutes from './routes/room.js'
import userRoutes from './routes/user.js'
import profileRoutes from './routes/profile.js'
import * as http from 'http'
import * as socket from 'socket.io'
import dotenv from 'dotenv'
import mainsocket from './socket-io/main.js'

const app = express()
dotenv.config()
const PORT = process.env.PORT || 80
const CONNECTION_URL = process.env.CONNECTION_URL
app.use(cors())

app.get('/', (req, res) => {
    res.send('running')
})

const server = http.createServer(app)
const io = new socket.Server(server, {
    cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
})

mainsocket(io)

app.use('/assets/', express.static('assets'))
app.use(express.json({limit: "30mb", extended: true}))
app.use(express.urlencoded({limit: "30mb", extended: true}))

app.use('/room', roomRoutes)
app.use('/user', userRoutes)
app.use('/profile', profileRoutes)



mongoose.connect(CONNECTION_URL)
.then(() =>{
    server.listen(5000, () => {
        console.log('listening')
    })
})
.catch((error) => {
    console.log(error);
})