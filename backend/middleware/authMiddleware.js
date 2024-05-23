import jstoken from "jsonwebtoken";
import { User } from "../models/UserSchema.js";
import asyncHandler from "express-async-handler";

export const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(" ")[1];

            if (!token) {
                res.status(401);
                throw new Error('Unauthorized, no token provided');
            }

            // Decode token
            const decoded = jstoken.verify(token, process.env.JSONTOKEN_SECRET);
            console.log("decoded", decoded);
            

            // Fetch user without password
            let user = await User.findById(decoded.id).select('-password');

            // Ensure the password field is removed
            if (user) {
                const userObj = user.toObject();
                req.user = userObj;
            } else {
                res.status(404);
                throw new Error('User not found');
            }
            next();
        } catch (error) {
            res.status(401);
            throw new Error('Unauthorized, token failed');
        }
    } else {
        res.status(401);
        throw new Error('Unauthorized, no token');
    }
});
