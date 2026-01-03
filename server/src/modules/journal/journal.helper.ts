import { TagInput } from "src/generated/graphql";
import { TagModel } from "../tag/tagSchema";

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
      // Check if tag with this name already exists for this user
      let existingTag = await TagModel.findOne({ name: t.name, userId });

      // If tag doesn't exist, create it
      if (!existingTag) {
        existingTag = await TagModel.create({ name: t.name, userId });
      }

      if (t.selected) {
        tagResults.push({
          id: (existingTag._id as any).toString(),
          name: existingTag.name,
          selected: true,
        });
      }
      continue;
    }

    // 修改既有 tag 名稱
    if (t.isEdited && t.id) {
      // Check if the new name already exists for this user
      const existingTag = await TagModel.findOne({ name: t.name, userId });

      if (existingTag && existingTag._id.toString() !== t.id) {
        // If tag with new name exists and it's different from current tag,
        // don't update - use the existing tag instead
        if (t.selected) {
          tagResults.push({
            id: existingTag._id.toString(),
            name: existingTag.name,
            selected: true,
          });
        }
        // Delete the old tag since we're merging it with existing one
        await TagModel.findByIdAndDelete(t.id);
        continue;
      }

      // If tag name doesn't conflict, update it
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
