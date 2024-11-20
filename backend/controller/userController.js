import catchAsyncError from "../middlewares/catchAsyncError.js";
import Notify from "../models/NotificationModel.js";
import User from "../models/UserModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import Features from "../utils/features.js";
import cloudinary from 'cloudinary'

export const getAllUser = catchAsyncError(async (req, res, next) => {

    const options = {
        profileImg: 0,
        coverImg: 0,
        bio: 0,
        link: 0,
        createdAt: 0,
        updatedAt: 0,
        __v: 0
    }
    const users = await User.find({}, options)
    if (!users) return next(new ErrorHandler("users not found", 404))
    res.status(200).json({
        count: users.length,
        success: true,
        users
    })
})
export const getProfile = catchAsyncError(async (req, res, next) => {

    const { username } = req.params
    const user = await User.findOne({ username }).select("-password")
    if (!user) return next(new ErrorHandler("user not found", 404))
    res.status(200).json({
        success: true,
        user
    })
})

export const followUnfollowUser = catchAsyncError(async (req, res, next) => {

    const { id } = req.params

    if (id == req.user._id) return next(new ErrorHandler("you cant follow/unfollow yourself", 404))
    const modifyUser = await User.findById(id)
    const currentUser = await User.findById(req.user._id)

    if (!modifyUser || !currentUser) return next(new ErrorHandler("User not found", 404))

    const isFollowing = currentUser.following.includes(id)
    if (isFollowing) {
        //unfollow
        await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } })
        await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } })
        //notification
        res.status(200).json({
            success: true,
            message: "Unfollowed user succesfully"
        })
    } else {
        //follow
        await User.findByIdAndUpdate(req.user._id, { $push: { following: id } })
        await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } })

        //send notification
        const newNotification = Notify({
            from: req.user._id,
            to: modifyUser._id,
            type: "follow"
        })
        await newNotification.save()
        res.status(200).json({
            success: true,
            message: "Followed user succesfully"
        })
    }


})

export const suggestedUser = catchAsyncError(async (req, res, next) => {
    const id = req.user._id

    const user = await User.findById(id)
    const suggestUsers = await User.aggregate([
        {
            $match: {
                _id: {
                    $ne: id
                }
            }
        }, {
            $sample: {
                size: 10
            }
        },
        {
            $project: {
                "password": 0,
                "followers": 0,
                "following": 0,
                "profileImg": 0,
                "coverImg": 0,
                "bio": 0,
                "link": 0,
                "createdAt": 0,
                "updatedAt": 0,
                "__v": 0
            }
        }
    ])
    const userSuggests = await suggestUsers.filter(u => !user.following.includes(u._id))

    res.status(200).json({
        success: true,
        count: suggestUsers.length,
        users: userSuggests
    })
})

export const updateUser = catchAsyncError(async (req, res, next) => {

    let { username, email, fullname, bio, link, profileImg, coverImg, currentPassword, newPassword } = req.body
    let user = await User.findById(req.user._id).select('+password')


    if (!user) return next(new ErrorHandler("User not found ", 404))

    if (currentPassword || newPassword) {
        if ((!currentPassword && newPassword) || (!newPassword && currentPassword)) {
            return next(new ErrorHandler("provide both old and new password", 400))
        }
        if (!await user.isValidPassword(currentPassword)) {
            return next(new ErrorHandler("Invalid password", 401))
        }
    }

    if(profileImg){
        if(user.profileImg){
            await cloudinary.uploader.destroy(user.profileImg.split('/').pop().split('.')[0])
        }
        const uploadedResponse = await cloudinary.uploader.upload(profileImg)
        profileImg = uploadedResponse.secure_url
    }
    if(coverImg){
        if(user.coverImg){
            await cloudinary.uploader.destroy(user.coverImg.split('/').pop().split('.')[0])
        }
        const uploadedResponse = await cloudinary.uploader.upload(coverImg)
        coverImg = uploadedResponse.secure_url     
    }




    user.fullname = fullname || user.fullname
    user.bio = bio || user.bio
    user.email = email || user.email
    user.username = username || user.username
    user.link = link || user.link
    user.profileImg = profileImg || user.profileImg
    user.coverImg = coverImg || user.coverImg
    user.password = newPassword || user.password
    user = await user.save()

    user.password = null
    res.status(200).json({
        success: true,
        user
    })

})



