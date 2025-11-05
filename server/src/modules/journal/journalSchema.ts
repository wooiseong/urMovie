import mongoose, { Schema, Document } from "mongoose";

// Journal interface
export interface Journal extends Document {
  _id: string;
  movieName: string;
  director: string;
  actor: string;
  tag: string[];
  title: string;
  content: string;
  date: Date;
}

// Journal Schema
const JournalSchema: Schema<Journal> = new Schema(
  {
    movieName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    director: {
      type: String,
      required: true,
      minlength: 8,
    },
    actor: {
      type: String,
      required: true,
      minlength: 8,
    },
    tag: {
      type: [String],
      required: true,
    },
    title: {
      type: String,
      required: true,
      minlength: 8,
    },
  },
  {
    timestamps: true,
  }
);

// User Model
export const JournalModel = mongoose.model<Journal & { _id: string }>(
  "Journal",
  JournalSchema
);
