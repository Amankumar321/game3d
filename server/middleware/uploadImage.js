import ProfileModal from "../models/profile.js"
import multer from 'multer'
import path from 'path'
import { fileURLToPath } from "url"
import { dirname } from "path"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const uploadimage = async (req, res, next) => {
    try {
        const { user, type } = req.params
        const folder = type === 'Image' ? 'image' : 'cover'
        const profile = await ProfileModal.findOne({username: user})

        const storage = multer.diskStorage({
            destination: function (req, file, callback) {
                callback(null, path.join('./assets/', folder))
            },
            filename: function (req, file, callback) {
                callback(null, profile.user_id + '.' + file.mimetype.split('/')[1])
            }
        })

        const fileFilter = (res, file, callback) => {
            if (file.mimetype.split('/')[0] === 'image') {
                callback(null, true)
            }
            else {
                callback(null, false)
            }
        }

        let upload = multer({storage: storage, limits: {
            fileSize: 1024 * 1024 * 5},
            fileFilter: fileFilter}).single('file')
        
        upload(req, res, function () {
            next()
        })

    } catch (error) {
        
    }
}

export default uploadimage