import express from 'express'
import dotenv from 'dotenv' ;
import path from 'path'
import connectDatabase from './config/database.js';
import app from './app.js';
import { fileURLToPath } from 'url';
import cloudinary from 'cloudinary'

const __dirname = path.resolve()
dotenv.config()
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret:process.env.API_SECRET_KEY 
})


if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,'/frontend/build')))
    app.use('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,"frontend","build","index.html"))
    })
}


app.listen(process.env.PORT,()=>{
    console.log(`Server listening to port ${process.env.PORT} in ${process.env.NODE_ENV}`)
    connectDatabase()
   
   
    
})