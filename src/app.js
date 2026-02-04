import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express() //config

app.use(cors({       //config
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

//middlewares
app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser()) //config



//routes import
import userRouter from './routes/user.routes.js'

//routes declaration
app.use("/api/v1/users", userRouter)  //-> http/localhost:8000/api/v1/users   this is prefix

export {app}