import express from "express";
import { deleteImage, uploadImage } from "../controller/uploadImageController.js";
import { uploadMiddleware } from "../middleware/uploadMiddleware.js";

const router = express.Router()

router.post('/', uploadMiddleware, uploadImage)
router.delete('/delete', deleteImage)

export default router;
