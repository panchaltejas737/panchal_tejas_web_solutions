import mongoose from "mongoose";

const TeamMemberSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    department: {
      type: String,
      required: true,
      enum: ["Developers", "Designers", "Management"],
    },
    corporatePhoto: { type: String, required: true }, // Cloudinary URL
    funPhoto: { type: String, required: true }, // Cloudinary URL
    githubUrl: { type: String, trim: true },
    linkedinUrl: { type: String, trim: true },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.TeamMember || mongoose.model("TeamMember", TeamMemberSchema);