import express from 'express'
import { isAuthenticate } from '../middlewares/authenticate.js'
import { deleteNotification, getNotification } from '../controller/notificationController.js'
const router =express.Router()


router.get('/',isAuthenticate,getNotification)
router.delete('/',isAuthenticate,deleteNotification)

export default router