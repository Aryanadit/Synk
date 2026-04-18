import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

// 🔥 Upload using buffer (NO local file system)
export const uploadMedia = (fileBuffer, folder = "") => {
  return new Promise((resolve, reject) => {
    if (!fileBuffer) return resolve(null);

    const finalFolder = folder ? `synk/${folder}` : "synk";

    const stream = cloudinary.uploader.upload_stream(
      {
        folder: finalFolder,
        resource_type: "auto",
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          return reject(error);
        }

        console.log("Uploaded:", result.public_id);

        resolve({
          url: result.secure_url,
          public_id: result.public_id,
        });
      },
    );

    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};

// 🔥 Delete media (unchanged, but slightly improved)
export const deleteMedia = async (public_id) => {
  try {
    if (!public_id) return;

    await cloudinary.uploader.destroy(public_id);

    console.log("Deleted:", public_id);
  } catch (error) {
    console.error("Delete error:", error);
    throw error;
  }
};
