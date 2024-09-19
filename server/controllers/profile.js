import UserModal from "../models/user.js"
import ProfileModal from "../models/profile.js"
import fs from'fs'
import path from "path"

export const editprofile = async (req, res) => {
    const {type, value} = req.body
    const { user } = req.params
    
    try {
        const oldUser = await UserModal.findOne({ username: user });
    
        if (!oldUser) return res.status(404).json({ message: "User doesnt exists" });

        if (type === 'Age') {
            await ProfileModal.findOneAndUpdate({username: user}, { age: value }, {new: true})
        }
        else if (type === 'Gender') {
            await ProfileModal.findOneAndUpdate({username: user}, { gender: value }, {new: true})
        }
        else if (type === 'Location') {
            await ProfileModal.findOneAndUpdate({username: user}, { location: value }, {new: true})
        }
        else if (type === 'Status') {
            await ProfileModal.findOneAndUpdate({username: user}, { status: value }, {new: true})
        }
        else if (type === 'AboutMe') {
            await ProfileModal.findOneAndUpdate({username: user}, { about: value }, {new: true})
        }
        else if (type === 'Image') {
            const profile = await ProfileModal.findOne({username: user})
            unlinkimage(type, profile)
            await ProfileModal.findOneAndUpdate({username: user}, { image: 'null' }, {new: true})
        }
        else if (type === 'Cover') {
            const profile = await ProfileModal.findOne({username: user})
            unlinkimage(type, profile)
            await ProfileModal.findOneAndUpdate({username: user}, { cover: 'null' }, {new: true})
        }

        res.status(200).json({})
    } catch (error) {
        
    }
}

export const editprofileimage = async (req, res) => {
    try {
        const { user, type } = req.params
        const folder = type === 'Image' ? 'image' : 'cover'
        const profile = await ProfileModal.findOne({username: user})
        //const localurl = `http://localhost:5001/assets/${folder}/`
        const url = `/assets/${folder}/`
        const filename = profile.user_id + '.' + req.file.mimetype.split('/')[1]

        unlinkimage(type, profile)

        if (type === 'Image') {
            await ProfileModal.findOneAndUpdate({username: profile.username}, { image: url + filename })
        }
        if (type === 'Cover') {
            await ProfileModal.findOneAndUpdate({username: profile.username}, { cover: url + filename })
        }

        res.status(200).json({})

    } catch (error) {
        
    }
}


const unlinkimage = async (type, profile) => {
    if (type === 'Image') {
        if (profile.image !== 'null') {
            let parts = profile.image.split('/')
            let oldfile = parts[parts.length - 1]
            fs.unlink(path.join('./assets/image/', oldfile), (err => {console.log(err)}))
        }
    }
    if (type === 'Cover') {
        if (profile.cover !== 'null') {
            let parts = profile.cover.split('/')
            let oldfile = parts[parts.length - 1]
            fs.unlink(path.join('./assets/cover/', oldfile), (err => {console.log(err)}))
        }
    }
}





export const getprofile = async (req, res) => {
    const { user } = req.params
    try {
        const profile = await ProfileModal.findOne({username: user})
        if (profile !== null) {
            const data = {}
            const attributes = ['username', 'image', 'cover', 'age', 'gender', 'location', 'status', 'about']
            attributes.forEach(e => {
                data[e] = profile[e]
            });
            data.dateJoined = profile.dateJoined.toString().slice(4, 15)
            res.status(200).json({profile: data})
        }
        else {
            res.status(404).json()
        }
    } catch (error) {
        res.status(500).json()
    }
}

export const getavatar = async(username) => {
    try {
        const user = await ProfileModal.findOne({ username: username });
        if (user) {
            return user.image;
        }
    }
    catch (error) {
        
    }
}

export const searchprofile = async (req, res) => {
    try {
        const { input } = req.body
        const regex = new RegExp(`^${input}`) 
        const userList = await ProfileModal.find({ username: regex });
        res.status(200).json({users: userList.slice(0,5)})
    }
    catch (error) {
        
    }
}
