import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  handle: string;
  description: string;
  image: string;
  links: string;
}

const userSchema = new Schema(
  {
    handle: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
    links: {
      type: String,
      default: "[]",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;
