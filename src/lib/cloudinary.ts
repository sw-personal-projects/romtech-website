import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

cloudinary.config({ 
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

export const uploadImage = async (
  imagePath: string,
  options: Record<string, unknown> = {}
): Promise<UploadApiResponse> => {
  try {
    const result = await cloudinary.uploader.upload(imagePath, {
      folder: 'romtech-website',
      ...options
    });
    return result;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

export default cloudinary;