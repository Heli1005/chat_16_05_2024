import express from "express";
import dotenv from "dotenv";

import { chats } from "./data/data.js";

const app = express()
dotenv.config()
const port = process.env.PORT || 5000

app.get('/', (req, res) => res.send('Hello World!'))
app.get('/api/chat', (req, res) => {
    res.send(chats)
})
app.listen(port, () => console.log(`Example app listening on port ${port}!...`))