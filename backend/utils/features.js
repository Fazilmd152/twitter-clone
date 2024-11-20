import catchAsyncError from "../middlewares/catchAsyncError.js"
import ErrorHandler from "./errorHandler.js"
import cloudinary from 'cloudinary'

class Features {
    constructor() {

    }
    async sentNotification(from, to, type, model) {
        const notify = model({ from, to, type })
        await notify.save()
        return true
    }

}

export default Features