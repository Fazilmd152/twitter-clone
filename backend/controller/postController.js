import catchAsyncError from "../middlewares/catchAsyncError.js";
import Notify from "../models/NotificationModel.js";
import Post from "../models/PostModel.js";
import User from "../models/UserModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import cloudinary from 'cloudinary'
import Features from "../utils/features.js";



export const createPost = catchAsyncError(async (req, res, next) => {
    const { text } = req.body
    let { img } = req.body

    const id = req.user._id.toString()
    const user = await User.findById(id)
    if (!user) return next(new ErrorHandler("user not found", 404))
    if (!text && !img) return next(new ErrorHandler("Post must have text or image", 401))
    if (img) {
        const uploadresponse = await cloudinary.uploader.upload(img)
        img = uploadresponse.secure_url
    }

    const newPost = await Post({
        user: id, text, img
    })

    await newPost.save()
    res.status(200).json({
        success: true,
        message: "Post created succesfully",
        newPost
    })
})

export const deletePost = catchAsyncError(async (req, res, next) => {
    const { id } = req.params


    const post = await Post.findById(id)
    if (!post) return new ErrorHandler("post not found", 404)
    if (post.user.toString() !== req.user._id.toString()) return new ErrorHandler("You are not authorized to delete the post", 401)

    if (post.img) {
        const imgId = post.img.split('/').pop().split('.')[0]
        await cloudinary.uploader.destroy(imgId)
    }

    await Post.findByIdAndDelete(id)
    res.status(200).json({
        success: true,
        message: "post has been deleted"
    })
})
export const commentPost = catchAsyncError(async (req, res, next) => {
    const { id } = req.params
    const { text } = req.body

    const post = await Post.findById(id)
    if (!post) return next(new ErrorHandler("post not found", 404))
    if (!text) return next(new ErrorHandler("write something to comment", 404))

    post.comment.push({ text, user: req.user._id })
    await post.save()
    const noti = await new Features().sentNotification(req.user._id, post.user, 'comment', Notify)

    res.status(200).json({
        success: true,
        message: "comment added to the post",
        notfication_sent: noti || false,
        post
    })
})

export const deleteComment = catchAsyncError(async (req, res, next) => {
    const { id,cid:commentId } = req.params
     
    await Post.updateOne({ _id: id }, { $pull: { comment:{_id:commentId}} })
    res.status(200).json({
        success: true,
        message: "comment deleted succesfully",
    })
})

export const likeUnlikePost = catchAsyncError(async (req, res, next) => {
    const { id: postId } = req.params
    const userId = req.user._id

    const post = await Post.findById(postId)
    if (!post) return new ErrorHandler("post not found", 404)

    const isLiked = post.likes.includes(userId)

    if (isLiked) {
        //unlike
        await Post.findByIdAndUpdate(postId, { $pull: { likes: userId } })
        await User.findByIdAndUpdate(userId, { $pull: { likedPosts: postId } })
        const updatedLikes = post.likes.filter(id => id !== userId)
        res.status(200).json({ success: true, updatedLikes })
    } else {
        //like
        const post = await Post.findByIdAndUpdate(postId, { $push: { likes: userId } })
        await User.findByIdAndUpdate(userId, { $push: { likedPosts: postId } })
        const noti = await new Features().sentNotification(userId, post.user, 'like', Notify)

        const updatedLikes = post.likes
        res.status(200).json({
            success: true,
            message: "liked",
            notfication_sent: noti || false,
            updatedLikes
        })
    }


})


export const getAllPosts = catchAsyncError(async (req, res, next) => {
    const posts = await Post.find().sort({ createdAt: -1 }).populate({
        path: "user",
        select: ["fullname", "username"]
    }).populate({ path: "comment.user", select: ["fullname", "username"] })
    if (!posts) return next(new ErrorHandler("Posts not found", 404))

    res.status(200).json({
        count: posts.length,
        success: true,
        posts
    })
})

export const getLikedPosts = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id)

    if (!user) return next(new ErrorHandler("user  not found", 404))

    const likedPosts = await Post.find({ _id: { $in: user.likedPosts } }).populate({
        path: 'user',
        select: ["fullname", "username"]
    }).populate({
        path: 'likes',
        select: ["fullname", "username"]
    })
    if (!likedPosts) return next(new ErrorHandler("there is no liked posts", 404))

    res.status(200).json({
        count: likedPosts.length,
        success: true,
        likedPosts
    })
})

export const getFollowingPosts = catchAsyncError(async (req, res, next) => {

    const user = await User.findById(req.user._id)
    if (!user) return next(new ErrorHandler("user  not found", 404))

    const following = user.following
    const feedPosts = await Post.find({ user: { $in: following } }).sort({ createdAtt: -1 }).populate({
        path: 'user',
        select: ["fullname", "username"]
    })
    // .populate({
    //     path: 'comment.user',
    //     select: ["fullname", "username", "-_id"]
    // })
    if (!feedPosts) return next(new ErrorHandler("feeds are not found", 404))

    res.status(200).json({
        count: feedPosts.length,
        success: true,
        feedPosts: feedPosts.length == 0 ? "Feed has no posts seems like you have not followig anyone" : feedPosts
    })
})

export const getUserPosts = catchAsyncError(async (req, res, next) => {

    const user = await User.findOne(req.params)
    if (!user) return next(new ErrorHandler("user  not found", 404))

    const usersPosts = await Post.find({ user: { $in: user._id } }).sort({ createdAtt: -1 }).populate({
        path: 'user',
        select: ["fullname", "username"]
    })// .populate({
    //     path: 'comment.user',
    //     select: ["fullname", "username", "-_id"]
    // })
    if (!usersPosts) return next(new ErrorHandler("feeds are not found", 404))

    res.status(200).json({
        count: usersPosts.length,
        success: true,
        usersPosts: usersPosts.length == 0 ? "You have'nt posted anything yet" : usersPosts
    })
})