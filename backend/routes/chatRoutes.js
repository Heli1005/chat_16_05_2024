import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { accessChat, addToGroup, createGroupChat, fetchChats, removeFromGroup, renameGroupName } from "../controller/chatController.js";

const router = express.Router()

router.route('/').post(protect, accessChat)// access or create chat
router.route('/').get(protect, fetchChats)// fetch chats
router.route('/group').post(protect, createGroupChat)// create group
router.route('/group/rename').put(protect, renameGroupName)// rename group
router.route('/group/add').put(protect, addToGroup)// add user to group
router.route('/group/remove').put(protect, removeFromGroup)// remove user from group

export default router;
