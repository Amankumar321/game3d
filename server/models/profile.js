import mongoose from "mongoose";

const profileSchema = mongoose.Schema({
    user_id: { type: String, required: true, unique: true },
    dateJoined: { type: Date, default: Date.now },
    username: { type: String, required: true, unique: true },
    image: { type: String, required: false, default: 'null' },
    cover: { type: String, required: false, default: 'null' },
    age: { type: Number, required: false, default: 0 },
    gender: { type: String, required: false, default: 'Others' },
    location: { type: String, required: false, default: 'Unknown' },
    status: { type: String, required: false, default: 'Unknown' },
    about: { type: String, required: false, default: 'Unknown' },
})

export default mongoose.model("Profile", profileSchema)