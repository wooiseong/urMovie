import mongoose, { Schema, Document } from "mongoose";

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

// 新增：Tag subdocument（符合 processTags 回傳格式）
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
  _id: string;
  movieName: string;
  director: string[];
  actor: string[];
  tag: { id: string; name: string; selected: boolean }[];
  image?: string;
  content: any; // Tiptap JSON
  quote: (typeof QuoteSchema)[];
  date: Date;
}

const JournalSchema: Schema<Journal> = new Schema(
  {
    movieName: { type: String, required: true, trim: true },
    director: { type: [String], default: [] },
    actor: { type: [String], default: [] },
    tag: { type: [JournalTagSchema], default: [] },
    image: { type: String },
    content: { type: Schema.Types.Mixed, required: true },
    quote: { type: [QuoteSchema], default: [] },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const JournalModel = mongoose.model<Journal>("Journal", JournalSchema);
