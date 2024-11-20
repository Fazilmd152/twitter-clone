import catchAsyncError from "../middlewares/catchAsyncError.js";
import User from "../models/UserModel.js";
import ErrorHandler from "../utils/errorHandler.js";
import sendToken from "../utils/jwtToken.js";


export const signup = catchAsyncError(async (req, res, next) => {
    const { username, fullname, email, password } = req.body
    const isEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!isEmail.test(email)) return next(new ErrorHandler("provide a valid email ", 404))

    const existingEmail = await User.findOne({ email })
    const existingUsername = await User.findOne({ username })

    if (existingEmail || existingUsername) { return next(new ErrorHandler("user already exists", 409)) }

    const newUser = await User(req.body)
    await newUser.save()
    sendToken(newUser, 200, res)
})

export const login = catchAsyncError(async (req, res, next) => {
    const { username, password } = req.body
    if (!username || !password) {
        return next(new ErrorHandler("please enter email and password", 400))
    }

    const user = await User.findOne({ $or: [{ username }, { email: username }] }).select("+password")

    if (!user) return next(new ErrorHandler("Invalid username or password", 401))

    if (!await user.isValidPassword(password)) return next(new ErrorHandler("Invalid username or password", 401))

    sendToken(user, 200, res)

})
export const logout = (req, res) => {
    
    res.cookie('jwt', "", {maxAge:0 })
    res.status(200).json({
        success: true,
        message: "Logged out succesfully"
    })
}

export const getMe = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id)
    res.status(200).json({
        success: true,
        user
    })
})




