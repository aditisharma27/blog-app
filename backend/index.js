import express from 'express' 
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import userRoute from './routes/userRoute.js'
import BlogRoute from './routes/BlogRoute.js'
import fileUpload from 'express-fileupload'
import { v2 as cloudinary } from 'cloudinary';
import cookieParser from 'cookie-parser'
import cors from 'cors'

const app = express()
dotenv.config()
const port = process.env.PORT;
const MONGODB_URL = process.env.MONGODB_URL;
//middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
   origin: process.env.FRONTEND_URL,
   methods: ['GET','POST','PUT','DELETE'], // Allow specific methods
   credentials:true,
})
);

//file upload...image
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir:"/tmp/",
}))

//DB CONNECTION
try {
  mongoose.connect(MONGODB_URL)
  console.log("connected to mongodb")
} catch (error) {
  console.log(error)
}

//definiting routes 
app.use("/api/users",userRoute);
app.use("/api/blogs",BlogRoute);

//cloudinary
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUD_API_KEY, 
  api_secret: process.env.CLOUD_SECRET_KEY        // Click 'View API Keys' above to copy your API secret
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})