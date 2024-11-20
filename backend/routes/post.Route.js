import express from 'express'
import { isAuthenticate } from '../middlewares/authenticate.js'
import { commentPost, createPost, deletePost, getAllPosts, getLikedPosts, likeUnlikePost,getFollowingPosts, getUserPosts, deleteComment } from '../controller/postController.js'

const router=express.Router()


router.get('/getallposts',isAuthenticate,getAllPosts)
router.post('/create',isAuthenticate,createPost)
router.get('/likes/:id',isAuthenticate,getLikedPosts)
router.get('/like/:id',isAuthenticate,likeUnlikePost)
router.post('/comment/:id',isAuthenticate,commentPost)
router.delete('/comment/:id/:cid',isAuthenticate,deleteComment)
router.delete('/:id',isAuthenticate,deletePost)
router.get('/following',isAuthenticate,getFollowingPosts)
router.get('/user/:username',isAuthenticate,getUserPosts)



export default router