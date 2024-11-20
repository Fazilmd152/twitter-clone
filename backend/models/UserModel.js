import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please enter username"],
        maxLength: [20, "name cannot exceed 20 characters"],
        unique: true
    },
    fullname: {
        type: String,
        required: [true, "Please enter your Name"],
        maxLength: [40, "name cannot exceed 40 characters"]
    },
    email: {
        type: String,
        required: [true, "Please enter your Email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please enter password"],
        minLength: [6, "password should atleast 6 characters"],
        select:false
    },
    followers: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'User',
            default: []
        }
    ],
    following: [
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'User',
            default: []
        }
    ],
    profileImg: {
        type: String,
        default: ""
    },
    coverImg: {
        type: String,
        default: ""
    },
    bio: {
        type: String,
        default: ""
    },
    link: {
        type: String,
        default: ""
    },
    likedPosts:[
        {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'Post',
            default: []
        }
    ]
}, { timestamps: true })

//hashing password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, 10); // Hash the password
    next()
})

//token
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
    })
}

//validating pssword
userSchema.methods.isValidPassword = async function (enteredPassword) {
    return  bcrypt.compare(enteredPassword, this.password)
}

const UserModel = mongoose.model('User', userSchema)

export default UserModel