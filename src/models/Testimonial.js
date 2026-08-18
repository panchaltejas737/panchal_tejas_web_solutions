import mongoose from "mongoose";

const TestimonialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    company: { type: String, trim: true },
    review: { type: String, required: true, trim: true },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    avatar: { type: String, trim: true }, // Cloudinary URL, optional
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.models.Testimonial || mongoose.model("Testimonial", TestimonialSchema);