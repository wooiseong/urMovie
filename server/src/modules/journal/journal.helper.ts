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
  tagInputs: TagInput[]
): Promise<{ _id: string; name: string; selected: boolean }[]> => {
  const tagResults: { _id: string; name: string; selected: boolean }[] = [];

  for (const t of tagInputs || []) {
    // 新增新 tag
    if (t.isNew) {
      const newTag = await TagModel.create({ name: t.name });
      if (t.selected) {
        tagResults.push({
          _id: newTag._id as any,
          name: newTag.name,
          selected: true,
        });
      }
    }
    // 編輯現有 tag
    else if (t.isEdited && t.id) {
      await TagModel.findByIdAndUpdate(t.id, { name: t.name });
      if (t.selected) {
        tagResults.push({
          _id: t.id,
          name: t.name,
          selected: true,
        });
      }
    }
    // 已存在且被選中的 tag
    else if (t.selected && t.id) {
      tagResults.push({
        _id: t.id,
        name: t.name,
        selected: true,
      });
    }

    // 刪除 tag（可選）
    if (t.isDeleted && t.id) {
      await TagModel.findByIdAndDelete(t.id);
    }
  }

  return tagResults;
};
