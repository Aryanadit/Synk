import cloudinary from '../config/cloudinary.js'
import fs from 'fs'

export const uploadMedia = async (filepath, folder = "chat-app") => {
    try {
        if (!filepath) return null;

        const result = await cloudinary.uploader.upload(filepath, {
            folder,
            resource_type: "auto"
        });

        fs.unlinkSync(filepath);

        return {
            url: result.secure_url,
            public_id: result.public_id
        };

    } catch (error) {
        if (filepath) fs.unlinkSync(filepath);
        throw error;
    }
};

export const deleteMedia = async (public_id) => {
    try {
        if (!public_id) return;

        await cloudinary.uploader.destroy(public_id);
    } catch (error) {
        throw error;
    }
};