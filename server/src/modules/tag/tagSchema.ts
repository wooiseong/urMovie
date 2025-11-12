import mongoose, { Schema, Document } from "mongoose";

export interface Tag extends Document {
  name: string;
}

const TagSchema: Schema<Tag> = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true },
  },
  { timestamps: true }
);

export const TagModel = mongoose.model<Tag>("Tag", TagSchema);
