import catchAsyncError from "../middlewares/catchAsyncError.js";
import Notify from "../models/NotificationModel.js";
import ErrorHandler from "../utils/errorHandler.js";

export const getNotification = catchAsyncError(async (req, res, next) => {
    const userId = req.user._id
    const notification = await Notify.find({ to: userId }).sort({createdAt:-1}).populate({
        path:"from",
        select:"username profileImg"
    })
    if(!notification)return next(new ErrorHandler("notifacation not found",404))

    await Notify.updateMany({to:userId},{read:true})

     res.status(200).json({
        success:true,
        count:notification.length,
        notification:notification.length==0?"No notifications":notification
})   

})

export const deleteNotification = catchAsyncError(async (req, res, next) => {
    const userId = req.user._id
    await Notify.deleteMany({to:userId})
    res.status(200).json({
        succes:true,
        message:"notifications deleted succesfully"
    })
})