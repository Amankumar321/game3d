import RoomModal from '../models/room.js'
import mongoose from 'mongoose'

export const createroom = async (req, res) => {
    const { user, roomPassword } = req.body
    try {
        const shortid = Math.random().toString(32).slice(2,8)
        const room = await RoomModal.create({ short_id: shortid, players: [], password: roomPassword })
        res.status(200).json({ id: shortid })
    } catch (error) {
        
    }
}

export const checkroom = async (req, res) => {
    const { roomId } = req.params
    const { roomPassword } = req.body
    
    try {
        if (roomId !== '') {
            const room = await RoomModal.findOne({short_id: roomId})
            if (room) {
                if (room.password === roomPassword) {
                    res.status(200).json({roomId: roomId})
                }
                else {
                    res.status(403).json({})
                }
            }
            else {
                res.status(404).json({})
            }
        }
    } catch (error) {
        
    }
}

export const joinroom = async (user, roomId) => {
    try {
        const room = await RoomModal.findOne({short_id: roomId})
        if (!room.players.includes(user) && !room.spectators.includes(user)) {
            await RoomModal.findOneAndUpdate({short_id: roomId}, {$push: { spectators: user }})
        }
    } catch (error) {
        
    }
}

export const leaveroom = async (user, roomId) => {
    const room = await RoomModal.findOne({short_id: roomId})
    try {
        if (room.players.includes(user)) {
            await RoomModal.findOneAndUpdate({short_id: roomId}, {$pull: { players: user }})
        }
        if (room.spectators.includes(user)) {
            await RoomModal.findOneAndUpdate({short_id: roomId}, {$pull: { spectators: user }})
        }
    } catch (error) {
        
    }
}

export const getusers = async (roomId) => {
    try {
        if (roomId != '') {
            const room = await RoomModal.findOne({ short_id: roomId })
            if (room) {
                return room.players.concat(room.spectators)
            }
        }    
    } catch (error) {
        
    }
}



export const getplayers = async (roomId) => {
    try {
        if (roomId != '') {
            const room = await RoomModal.findOne({ short_id: roomId })
            if (room) {
                return room.players
            }
        }    
    } catch (error) {
        
    }
}

export const getgametype = async (roomId) => {
    try {
        if (roomId !== '') {
            const room = await RoomModal.findOne({ short_id: roomId })
            if (room) {
                return room.gameType
            }
        }    
    } catch (error) {
        
    }
}

export const setgametype = async (roomId, type) => {
    try {
        if (roomId !== '') {
            await RoomModal.findOneAndUpdate({ short_id: roomId}, { gameType: type })
        }    
    } catch (error) {
        
    }
}

export const getgamestatus = async (roomId) => {
    try {
        if (roomId !== '') {
            const room = await RoomModal.findOne({ short_id: roomId })
            return room.status
        }    
    } catch (error) {
        
    }
}

export const setgamestatus = async (roomId, status) => {
    try {
        if (roomId !== '') {
            await RoomModal.findOneAndUpdate({ short_id: roomId }, { status: status })
        }    
    } catch (error) {
        
    }
}

export const togglepublicroom = async (roomId) => {
    try {
        if (roomId !== '') {
            const room = await RoomModal.findOne({ short_id: roomId })
            if (room.password) return false;
            const updated = await RoomModal.findOneAndUpdate({ short_id: roomId }, { public: !room.public }, {new: true})
            return updated.public
        }    
    } catch (error) {
        
        return false
    }
}

export const getpublicstatus = async (roomId) => {
    try {
        if (roomId !== '') {
            const room = await RoomModal.findOne({ short_id: roomId })
            if (room) {
                return room.public
            }
            else return false
        }    
    } catch (error) {
        
        return false
    }
}

export const toggleplayroom = async (user, roomId) => {
    try {
        if (roomId !== '') {
            const room = await RoomModal.findOne({ short_id: roomId })
            var updated;
            if (room.spectators.includes(user)) {
                await RoomModal.findOneAndUpdate({short_id: roomId}, {$pull: { spectators: user }}, {new: true})
                updated = await RoomModal.findOneAndUpdate({short_id: roomId}, {$push: { players: user }}, {new: true})
            }
            if (room.players.includes(user)) {
                await RoomModal.findOneAndUpdate({short_id: roomId}, {$push: { spectators: user }}, {new: true})
                updated = await RoomModal.findOneAndUpdate({short_id: roomId}, {$pull: { players: user }}, {new: true})
            }
            return updated.players
        }    
    } catch (error) {
        
    }
}