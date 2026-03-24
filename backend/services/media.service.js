import cloudinary from '../config/cloudinary.js'
import fs from 'fs/promises';

export const uploadMedia = async (filepath, folder = "") => {
    try {
        if (!filepath) return null;

        const finalFolder = folder ? `synk/${folder}` : "synk";

        const result = await cloudinary.uploader.upload(filepath, {
            folder: finalFolder,
            resource_type: "auto"
        });

        await fs.unlink(filepath);
        
        console.log("Uploaded:", result.public_id);

        return {
            url: result.secure_url,
            public_id: result.public_id
        };

    } catch (error) {
        if (filepath) {
            try {
                await fs.unlink(filepath);
            } catch (err) {
                console.error("File delete error:", err);
            }
        }
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