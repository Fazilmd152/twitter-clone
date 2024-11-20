import mongoose, { Schema } from 'mongoose'

const postSchema =  Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    },
    text:String,
    img:String,
    likes:[
        {
          
            type:mongoose.Types.ObjectId,
            ref:'User'
           
        }
    ],
    comment:[
        {
            text:{
                type:String,
                required:true
            },
            user:{
                type:mongoose.Types.ObjectId,
                required:true,
                ref:"User"
            }
        }
    ]
},{timestamps:true})

const postModel = mongoose.model('post', postSchema)

export default postModel