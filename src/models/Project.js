import mongoose from "mongoose";

const ProjectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    category: { type: String, required: true, trim: true },
    techUsed: [{ type: String, trim: true }],
    thumbnail: { type: String, required: true }, // Cloudinary URL
    challenge: { type: String, trim: true },
    solution: { type: String, trim: true },
    result: { type: String, trim: true },
    clientName: { type: String, trim: true },
    liveUrl: { type: String, trim: true },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Project || mongoose.model("Project", ProjectSchema);