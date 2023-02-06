import express from 'express'
import { createroom, checkroom, getusers } from '../controllers/room.js'
import auth from '../middleware/auth.js'

const router = express.Router()

router.post('/create', auth, createroom)
router.post('/:roomId', auth, checkroom)

export default router