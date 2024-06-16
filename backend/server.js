import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import { v2 as cloudinary } from 'cloudinary';
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import { Server } from "socket.io";
import { createServer } from "http";

dotenv.config()
connectDB()
cloudinary.config({
    cloud_name: `${process.env.CLOUDINARY_CLOUD_NAME}`,
    api_key: `${process.env.CLOUDINARY_API_KEY}`,
    api_secret: `${process.env.CLOUDINARY_SECRET_KEY}`,
});

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:5173",
    }
});

io.on('connection', (socket) => {
    console.log('socket connected');
    socket.on("setup", (user) => {
        socket.join(user._id)
        socket.emit("connected")
        console.log("user._id", user._id);
    })

    socket.on('join-chat', (room) => {
        socket.join(room)
        console.log(`joined room : ${room}`);
    })

    socket.on('new-message', (newMsg) => {
        console.log("newMsg", newMsg);

        var chat = newMsg.chat
        if (!chat.users)
            return console.log("user not found..");

        chat.users.forEach(user => {
            console.log("user", user)
            if (user._id === newMsg.sender._id) return;

            socket.in(user._id).emit("new-message-received", newMsg)
        })
    })

    socket.on('typing', (room) => socket.in(room).emit('typing'))
    socket.on('stop typing', (room) => socket.in(room).emit('stop typing'))

    socket.off("setup", (user) => {
        socket.leave(user._id)
        console.log("User disconnected");
    })
})

app.use(express.json())
const port = process.env.PORT || 5000

app.use('/api/user', userRoutes)
app.use('/api/uploadimage', uploadRoutes)
app.use('/api/chat', chatRoutes)
app.use('/api/message', messageRoutes)
app.get('/', (req, res) => res.send('Hello World!'))
app.use(notFound)
app.use(errorHandler)

// app.get('/api/chat', (req, res) => {
//     res.send(chats)
// })

httpServer.listen(port, () => console.log(`Example app listening on port ${port}!...`.yellow.bold.underline))
