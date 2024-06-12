import asyncHandler from "express-async-handler";
import { Message } from "../models/MessageSchema.js";
import { User } from "../models/UserSchema.js";
import { Chat } from "../models/ChatSchema.js";

export const sendMessage = asyncHandler(async (req, res,) => {
    const { content, chatId } = req.body
    if (!content || !chatId) {
        console.log('Invalid data passed in request');
        return res.sendStatus(400)
    }

    var newMessage = {
        sender: req.user._id,
        content: content,
        chat: chatId
    }

    try {
        var message = await Message.create(newMessage)
        message = await message.populate("sender", "name profile");
        message = await message.populate('chat')

        message = await User.populate(message, {
            path: 'chat.users',
            select: 'name profile email'
        })

        await Chat.findByIdAndUpdate(req.body.chatId, {
            latestMessage: message
        })
        res.json(message)

    } catch (e) {
        res.status(400)
        throw new Error(e.message)
    }
})

export const allMessages = asyncHandler(async (req, res,) => {

    try {
        var message = await Message.find({ chat: req.params.chatId })
            .populate("sender", "name profile email")
            .populate("chat")
        res.json(message)

    } catch (e) {
        res.status(400)
        throw new Error(e.message)
    }
})