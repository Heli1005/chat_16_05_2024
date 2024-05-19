import asyncHandler from "express-async-handler";
import { v2 as cloudinary } from 'cloudinary';

export const uploadImage = asyncHandler(async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        // Upload file data directly to Cloudinary
        const result = await cloudinary.uploader.upload_stream({ folder: 'profiles', resource_type: 'auto' }, (error, result) => {
            if (error) {
                console.error('Upload error:', error);
                res.status(500).json({ message: 'Image upload failed', error: error.message });
            } else {
                res.status(200).json({ message: 'Image uploaded successfully', result });
            }
        }).end(req.file.buffer);

    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ message: 'Image upload failed', error: error.message });
    }
})

export const deleteImage = asyncHandler(async (req, res) => {
    const { public_id } = req.body;

    if (!public_id) {
        return res.status(400).json({ message: 'Public ID is required' });
    }

    cloudinary.uploader.destroy(public_id, (error, result) => {
        if (error) {
            console.error('Delete error:', error);
            return res.status(500).json({ message: 'Image deletion failed', error: error.message });
        }
        res.status(200).json({ message: 'Image deleted successfully', result });
    });
});