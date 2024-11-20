import { Router } from "express";
import { followUnfollowUser, getAllUser, getProfile,  suggestedUser, updateUser } from "../controller/userController.js";
import { isAuthenticate } from "../middlewares/authenticate.js";
const router = Router()


router.get('/profile/:username',isAuthenticate,getProfile)
router.get('/follow/:id',isAuthenticate,followUnfollowUser)
router.get('/all',getAllUser)
router.get('/suggesteduser',isAuthenticate,suggestedUser)
router.put('/update',isAuthenticate,updateUser)


export default router