import { v2 as cloudinary } from "cloudinary";

const connectCloudinary = async () => {
  const { CLOUDINARY_NAME, CLOUDINARY_API_KEY, CLOUDINARY_SECRET_KEY } =
    process.env;

  if (!CLOUDINARY_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_SECRET_KEY) {
    console.error(
      "❌ Missing Cloudinary credentials in environment variables."
    );
    process.exit(1);
  }

  cloudinary.config({
    cloud_name: CLOUDINARY_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_SECRET_KEY,
    secure: true,
  });
};

export default connectCloudinary;
