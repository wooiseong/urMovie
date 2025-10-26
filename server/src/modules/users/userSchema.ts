import mongoose, { Schema, Document } from "mongoose";

// IUser interface
export interface IUser extends Document {
  _id: string;
  username: string;
  password: string;
  role: "admin" | "user" | "premiumUser";
}

// User Schema
const UserSchema: Schema<IUser> = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    role: {
      type: String,
      enum: ["admin", "user", "premiumUser"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

// User Model
export const UserModel = mongoose.model<IUser & { _id: string }>(
  "User",
  UserSchema
);
