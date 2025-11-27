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
