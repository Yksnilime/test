import mongoose, { Document, Schema } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userId: { type: String, unique: true, required: true, default: "demo-user" },
    emailAddress: { type: String, required: true, default: "demo@example.com" },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
