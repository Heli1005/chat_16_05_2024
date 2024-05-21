import asyncHandler from "express-async-handler";
import { User } from "../models/UserSchema.js";
import { generateWebToken } from "../config/generateToken.js";

export const registerUser = asyncHandler(async (req, res,) => {
    console.log("req", req);
    
    const { name, email, password, profile } = req.body
    // field validation
    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Please enter all fields')
    }
    //if user exist
    const userExist = await User.findOne({ email })
    if (userExist) {
        res.status(400)
        throw new Error('User already exists')
    }
    //create user
    const user = await User.create({
        name,
        email,
        password,
        profile
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            password: user.password,
            profile: user.profile,
            token: await generateWebToken(user._id)
        })
    } else {
        res.status(400);
        throw new Error('Failed to create the user.')
    }
})

export const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    //matchpassword valodation
    const user = await User.findOne({ email })
    //find one user
    if (user && (await user.matchPassword(password))) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            password: user.password,
            profile: user.profile,
            token: await generateWebToken(user._id)
        })
    }
    else {
        res.status(400);
        throw new Error('Invalid User or Password')
    }// user not found
})