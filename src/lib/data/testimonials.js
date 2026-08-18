import dbConnect from "@/lib/dbConnect";
import Testimonial from "@/models/Testimonial";

export async function getTestimonials() {
  try {
    await dbConnect();
    const testimonials = await Testimonial.find({ isActive: true })
      .sort({ createdAt: -1 })
      .lean();

    return JSON.parse(JSON.stringify(testimonials));
  } catch (error) {
    console.error("Failed to fetch testimonials:", error);
    return [];
  }
}