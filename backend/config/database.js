import dotenv from 'dotenv';
import mongoose from 'mongoose'
import path from 'path'
import { fileURLToPath } from 'url';

const __dirname = path.resolve()
dotenv.config()


async function connectDatabase(){
await mongoose.connect(process.env.DB_URL).then(d=>{
   console.log(`Database connected`);
}).catch(e=>{
    console.log(`Error in connecting DB:${e.message}`);
})
}
export default connectDatabase