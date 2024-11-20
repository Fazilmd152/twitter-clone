import express from 'express'
import authRouter from './routes/auth.Route.js'
import userRouter from './routes/user.Route.js'
import postRouter from './routes/post.Route.js'
import notificationRouter from './routes/notifications.Route.js'
import error from './middlewares/error.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app=express()

const corsOptions = {
    origin: ['http://localhost:3000'],
    credentials: true
  }

app.use(express.json(
{limit:'2mb'}
))
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(cors(corsOptions))
app.use('/api/auth',authRouter)
app.use('/api/users',userRouter)
app.use('/api/posts',postRouter)
app.use('/api/notifications',notificationRouter)
app.use(error)

export default app