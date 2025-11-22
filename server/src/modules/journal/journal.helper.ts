import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { GraphQLError } from "graphql";
import { TagInput } from "src/generated/graphql";
import { TagModel } from "../tag/tagSchema";

// TODO: Move to a config file
const BASE_URL = "http://localhost:4000";

export const handleImageUpload = (image: string, userId: string) => {
  if (!image) return null;

  // Check if the image is a base64 string
  if (image.startsWith("data:image")) {
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
      "../../../public/uploads/images",
      imageName
    );

    fs.writeFileSync(imagePath, base64Data, "base64");

    return `${BASE_URL}/uploads/images/${imageName}`;
  }

  // If it's not a base64 string, assume it's already a URL
  return image;
};

export const processTags = async (
  tagInputs: TagInput[],
  userId: string
): Promise<{ id: string; name: string; selected: boolean }[]> => {
  const tagResults: { id: string; name: string; selected: boolean }[] = [];

  for (const t of tagInputs || []) {
    // 刪除既有 tag
    if (t.isDeleted && t.id && !t.isNew) {
      await TagModel.findByIdAndDelete(t.id);
      continue;
    }

    // 新增 tag
    if (t.isNew) {
      const newTag = await TagModel.create({ name: t.name, userId });

      if (t.selected) {
        tagResults.push({
          id: (newTag._id as any).toString(),
          name: newTag.name,
          selected: true,
        });
      }
      continue;
    }

    // 修改既有 tag 名稱
    if (t.isEdited && t.id) {
      await TagModel.findByIdAndUpdate(t.id, { name: t.name });
    }

    // 已存在 tag 且被選中
    if (t.selected && t.id) {
      tagResults.push({
        id: t.id,
        name: t.name,
        selected: true,
      });
    }
  }

  return tagResults;
};
