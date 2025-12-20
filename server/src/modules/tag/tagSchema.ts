import mongoose, { Schema, Document } from "mongoose";

export interface Tag extends Document {
  name: string;
  userId: string;
}

const TagSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    userId: { type: String, required: true },
  },
  { timestamps: true }
);

TagSchema.index({ name: 1, userId: 1 }, { unique: true });

export const TagModel = mongoose.model<Tag>("Tag", TagSchema as any);
