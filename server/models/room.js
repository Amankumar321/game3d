import mongoose from "mongoose";

const roomSchema = mongoose.Schema({
    short_id: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: false, default: null },
    players: { type: [String], default: [] },
    spectators: { type: [String], default: [] },
    gameType: { type: String, default: '' },
    status: { type: Boolean, default: false },
    public: { type: Boolean, default: false },
    expireAt: { type: Date, default: Date.now, index: { expires: '240m' } }
})

export default mongoose.model("Room", roomSchema)