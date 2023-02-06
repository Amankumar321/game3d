import express from 'express'
import auth from '../middleware/auth.js'
import uploadimage from '../middleware/uploadImage.js'
import { editprofile, editprofileimage, searchprofile, getprofile } from "../controllers/profile.js"

const router = express.Router()


router.put("/:user", auth, editprofile)
router.post("/:user/:type", auth, uploadimage, editprofileimage)
router.post("/search", searchprofile)
router.get("/:user", getprofile)

export default router