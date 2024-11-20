import ErrorHandler from "../utils/errorHandler.js"

export default (err,req,res,next)=>{
    
    err.statuscode = err.statuscode || 500
   
    res.status(err.statuscode).json({
            success: false,
            message: err.message ,
            stack: err.stack,
            //err
        })
}