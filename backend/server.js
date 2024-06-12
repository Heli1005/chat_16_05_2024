import express from "express";
import dotenv from "dotenv";
import colors from "colors";
// import { chats } from "./data/data.js";
import { v2 as cloudinary } from 'cloudinary';
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

dotenv.config()
connectDB()
cloudinary.config({
    cloud_name: `${process.env.CLOUDINARY_CLOUD_NAME}`,
    api_key: `${process.env.CLOUDINARY_API_KEY}`,
    api_secret: `${process.env.CLOUDINARY_SECRET_KEY}`,
});

const app = express()

app.use(express.json())
const port = process.env.PORT || 5000 

app.use('/api/user', userRoutes)
app.use('/api/uploadimage',uploadRoutes)
app.use('/api/chat',chatRoutes)
app.use('/api/message', messageRoutes)
app.use(notFound)
app.use(errorHandler)
 
// app.get('/', (req, res) => res.send('Hello World!'))
// app.get('/api/chat', (req, res) => {
//     res.send(chats)
// })
app.listen(port, () => console.log(`Example app listening on port ${port}!...`.yellow.bold.underline))