import asyncHandler from 'express-async-handler';
import { Chat } from '../models/ChatSchema.js';
import { User } from '../models/UserSchema.js';

export const accessChat = asyncHandler(async (req, res,) => {

    const { userId } = req.body
    if (!userId) {
        // throw new Error('UserId params not sent with request')
        console.log('UserId params not sent with request');
        return res.sendStatus(401)
    }

    var isChat = await Chat.find(
        {
            isGroupChat: false,
            $and: [
                { users: { $elemMatch: { $eq: req.user._id } } },
                { users: { $elemMatch: { $eq: userId } } }
            ]
        }
    ).populate('users', '-password')
        .populate('lastestMessage')

    isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "name pic email"
    })

    if (isChat?.length > 0) {
        res.send(isChat[0])

    } else {
        var chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [req.user._id, userId]
        }
    }
    try {
        const createChat = await Chat.create(chatData)
        const fullChat = await Chat.findOne({ _id: createChat._id }).populate("users", "-password")
        res.status(200).send(fullChat)
    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
    console.log("isChat", isChat);
})

export const fetchChats = asyncHandler(async (req, res,) => {
    try {
        Chat.find(
            {
                users: { $elemMatch: { $eq: req.user._id } }
            }
        ).populate("users", "-password")
            .populate("groupAdmin", "-password")
            .populate("latestMessage")
            .sort({ updatedAt: -1 })
            .then(async (result) => {
                result = await User.populate(result, {
                    path: "testMessage.sender",
                    select: "name pic email"

                })
                res.status(200).send(result)
            })

    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
})

export const createGroupChat = asyncHandler(async (req, res,) => {
    if (!req.body.users && !req.body.name) {
        return res.status(400).send({ message: 'Please fill all the required fields!' })
    }

    const users = JSON.parse(req.body.users)
    if (users.length < 2) {
        res.status(400)
            .send({ message: 'More than 2 users are required for creating group!!' })
    }
    users.push(req.user)
    try {
        const groupChat = await Chat.create(
            {
                chatName: req.body.name,
                isGroupChat: true,
                users: users,
                groupAdmin: req.user
            }
        )

        const FullGroupChat = await Chat.findOne({ _id: groupChat._id })
            .populate("users", "-password")
            .populate("groupAdmin", "-password")
        res.status(200).send(FullGroupChat)
    } catch (error) {
        res.status(400)
        throw new Error(error.message)
    }
})

export const renameGroupName = asyncHandler(async (req, res,) => {

    const { chatId, chatName } = req.body

    const updateChat = await Chat.findByIdAndUpdate(chatId,
        {
            chatName
        }, {
        new: true
    })
        .populate("users", "-password")
        .populate("groupAdmin", "-password")

    if (!updateChat) {
        res.status(404)
        throw new Error('Chat not found')
    } else {
        res.json(updateChat)
    }
})

export const addToGroup = asyncHandler(async (req, res,) => {
    const { chatId, userId } = req.body

    const addUser = await Chat.findByIdAndUpdate(chatId,
        {
            $addToSet: { users: userId }// push => addToSet  Use $addToSet to avoid duplicates
        },
        {
            new: true
        }
    ).populate("users", "-password")
        .populate("groupAdmin", "-password")

    if (!addUser) {
        res.status(404)
        throw new Error('Chat not found')
    } else {
        res.json(addUser)
    }
})


export const removeFromGroup = asyncHandler(async (req, res,) => {
    const { chatId, userId } = req.body

    const removeUser = await Chat.findByIdAndUpdate(chatId,
        {
            $pull: { users: userId }
        },
        {
            new: true
        }
    ).populate("users", "-password")
        .populate("groupAdmin", "-password")

    if (!removeUser) {
        res.status(404)
        throw new Error('Chat not found')
    } else {
        res.json(removeUser)
    }
})