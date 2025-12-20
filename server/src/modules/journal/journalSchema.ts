import mongoose, { Schema, Document } from "mongoose";

// Quote interface
interface Quote {
  name?: string;
  content?: string;
  backgroundColor: string;
  textColor: string;
}

// Quote subdocument
const QuoteSchema = new Schema(
  {
    name: String,
    content: String,
    backgroundColor: { type: String, default: "#ffffff" },
    textColor: { type: String, default: "#000000" },
  },
  { _id: false }
);

// Tag subdocument
const JournalTagSchema = new Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    selected: { type: Boolean, default: false },
  },
  { _id: false }
);

// Journal interface
export interface Journal extends Document {
  userId: string; // 新增
  movieName: string;
  director: string[];
  actor: string[];
  tag: { id: string; name: string; selected: boolean }[];
  image?: string;
  content: any; // Tiptap JSON
  quote: Quote[];
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Journal schema
const JournalSchema = new Schema(
  {
    userId: { type: String, required: true }, // 存使用者 ID
    movieName: { type: String, required: true, trim: true },
    director: { type: [String], default: [] },
    actor: { type: [String], default: [] },
    tag: { type: [JournalTagSchema], default: [] },
    image: { type: String },
    content: { type: Schema.Types.Mixed, required: true },
    quote: { type: [QuoteSchema], default: [] },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true } // 自動新增 createdAt / updatedAt
);

export const JournalModel = mongoose.model<Journal>("Journal", JournalSchema as any);
