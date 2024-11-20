import mongoose, {  Schema } from "mongoose";

const notificationSchema=Schema({
    from:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    },
    to:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    },
    read:{
        type:Boolean,
        default:false
    },
    type:{
        type:String,
        required:true,
        enum:['follow','like','comment']
    }
})

const NotificationModel=mongoose.model('Notification',notificationSchema)
export default NotificationModel