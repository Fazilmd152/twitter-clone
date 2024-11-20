import jwt from "jsonwebtoken"
import User from "../models/UserModel.js"
import catchAsyncError from "./catchAsyncError.js"
import ErrorHandler from "../utils/errorHandler.js"

export const isAuthenticate = catchAsyncError(async (req, res, next) => {
    const {jwt:token} =req.cookies

    if (!token) return next(new ErrorHandler("Login to access account", 401))

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decodedToken.id)
    if (!user) return next(new ErrorHandler("user not found", 401))
    req.user=user    
    next()

})