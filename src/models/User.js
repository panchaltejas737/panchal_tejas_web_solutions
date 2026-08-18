import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, trim: true, lowercase: true },
    password: { type: String, required: true }, // stored as bcrypt hash, never plain text
    name: { type: String, trim: true, default: "Admin" },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);