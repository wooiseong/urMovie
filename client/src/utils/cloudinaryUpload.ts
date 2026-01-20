/**
 * Cloudinary Upload Utility
 *
 * This implementation uses unsigned uploads with an upload preset.
 * Configuration is stored in environment variables for easy management.
 *
 * SECURITY: Only the cloud name and upload preset are exposed in client-side code.
 * API keys and secrets remain secure on the server side.
 */

const CLOUDINARY_CLOUD_NAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME || "dspmllnna";
const CLOUDINARY_UPLOAD_PRESET = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET || "urMovie-media";

export interface CloudinaryUploadResponse {
  secure_url: string;
  public_id: string;
  format: string;
  width: number;
  height: number;
  bytes: number;
}

/**
 * Uploads an image file to Cloudinary
 * @param file - The image file to upload
 * @param folder - Optional folder path in Cloudinary (e.g., "journals", "avatars")
 * @returns The Cloudinary secure URL of the uploaded image
 */
export const uploadToCloudinary = async (
  file: File,
  folder?: string
): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

  if (folder) {
    formData.append("folder", folder);
  }

  // Add timestamp for uniqueness
  formData.append("timestamp", Date.now().toString());

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || "Failed to upload image to Cloudinary");
    }

    const data: CloudinaryUploadResponse = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw error;
  }
};

/**
 * Uploads a base64 image string to Cloudinary
 * @param base64String - The base64 encoded image string
 * @param folder - Optional folder path in Cloudinary
 * @returns The Cloudinary secure URL of the uploaded image
 */
export const uploadBase64ToCloudinary = async (
  base64String: string,
  folder?: string
): Promise<string> => {
  const formData = new FormData();
  formData.append("file", base64String);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

  if (folder) {
    formData.append("folder", folder);
  }

  formData.append("timestamp", Date.now().toString());

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || "Failed to upload image to Cloudinary");
    }

    const data: CloudinaryUploadResponse = await response.json();
    return data.secure_url;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw error;
  }
};
