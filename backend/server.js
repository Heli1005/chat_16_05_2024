import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import { chats } from "./data/data.js";
import { connectDB } from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

dotenv.config()
connectDB()

const app = express()

app.use(express.json())
const port = process.env.PORT || 5000

app.use('/api/user',userRoutes)
app.use(notFound)
app.use(errorHandler)

// app.get('/', (req, res) => res.send('Hello World!'))
// app.get('/api/chat', (req, res) => {
//     res.send(chats)
// })
app.listen(port, () => console.log(`Example app listening on port ${port}!...`.yellow.bold.underline))