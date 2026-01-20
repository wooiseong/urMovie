import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { GraphQLError } from "graphql";

// TODO: Move to a config file
const BASE_URL = "http://localhost:4000";
const CLOUDINARY_BASE_URL = "https://res.cloudinary.com";

/**
 * Handles image upload for both legacy (local storage) and Cloudinary URLs
 *
 * Now that we're using Cloudinary, this function primarily validates URLs.
 * Legacy support for base64 uploads is maintained but should be phased out.
 */
export const handleImageUpload = (
  image: string,
  userId: string,
): string | null => {
  if (!image) return null;

  // Check if it's a Cloudinary URL (recommended)
  if (
    image.startsWith(CLOUDINARY_BASE_URL) ||
    image.includes("cloudinary.com")
  ) {
    // Validate that it's a valid Cloudinary URL
    try {
      new URL(image);
      return image;
    } catch (error) {
      throw new GraphQLError("Invalid Cloudinary URL", {
        extensions: { code: "BAD_REQUEST" },
      });
    }
  }

  // Check if it's an existing server URL (legacy)
  if (image.startsWith(BASE_URL)) {
    return image;
  }

  // Legacy support: Handle base64 string uploads (DEPRECATED - use Cloudinary instead)
  if (image.startsWith("data:image")) {
    console.warn(
      "Base64 image upload is deprecated. Please use Cloudinary instead.",
    );

    const matches = image.match(/^data:image\/([a-zA-Z]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      throw new GraphQLError("Invalid image format", {
        extensions: { code: "BAD_REQUEST" },
      });
    }

    const imageExtension = matches[1];
    const base64Data = matches[2];
    const imageName = `${userId}-${uuidv4()}.${imageExtension}`;
    const imagePath = path.join(
      __dirname,
      "../../public/uploads/images",
      imageName,
    );

    // Ensure directory exists
    const dir = path.dirname(imagePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(imagePath, base64Data, "base64");

    return `${BASE_URL}/uploads/images/${imageName}`;
  }

  // If it's none of the above, validate as a general URL
  try {
    new URL(image);
    return image;
  } catch (error) {
    throw new GraphQLError("Invalid image URL format", {
      extensions: { code: "BAD_REQUEST" },
    });
  }
};
