import UserModal from "../models/user.js"
import ProfileModal from "../models/profile.js"
import jwt from "jsonwebtoken"

export const signin = async (req, res) => {
    const { username, password } = req.body
    
    try {

        const oldUser = await UserModal.findOne({ username: username })
    
        if (!oldUser) return res.status(404).json({ message: "User doesn't exist" })
    
        const isPasswordCorrect = await password == oldUser.password
    
        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" })

        const oldPro = await ProfileModal.findOne({ user_id: oldUser._id })

        const token = jwt.sign({ username: oldUser.username }, 'test', { expiresIn: '1h' })
        res.status(200).json({ result: oldPro, token: token })

      } 
      catch (err) {
        res.status(500).json({ message: "Something went wrong" })
      }
}

export const signup = async (req, res) => {
    const { username, password } = req.body

    try {
        
        const oldUser = await UserModal.findOne({ username: username });
    
        if (oldUser) return res.status(403).json({ message: "User already exists" });
    
        const result = await UserModal.create({ username: username, password: password });

        const pro = await ProfileModal.create({ user_id: result._id, username: result.username, image: 'null' })

        const token = jwt.sign({ username: username }, 'test', { expiresIn: '1h' })
        res.status(200).json({ result: pro, token: token })
      } 
      catch (error) {
        res.status(500).json({ message: "Something went wrong" });  
      }
}
