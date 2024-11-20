import express from 'express'
import {getMe, login, logout, signup } from '../controller/auth.Controller.js'
import { isAuthenticate } from '../middlewares/authenticate.js'
const router=express.Router()



router.route('/signup').post(signup)
router.route('/login').post(login)
router.route('/logout').get(logout)
router.route('/getme').get(isAuthenticate,getMe)


export default router