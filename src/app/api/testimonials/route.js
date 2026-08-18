import { NextResponse } from "next/server";
import { z } from "zod";
import dbConnect from "@/lib/dbConnect";
import Testimonial from "@/models/Testimonial";
import { getAuthUser } from "@/lib/auth";

const testimonialSchema = z.object({
  name: z.string().min(2),
  company: z.string().optional(),
  review: z.string().min(10),
  rating: z.number().min(1).max(5).optional(),
  avatar: z.string().optional(),
  isActive: z.boolean().optional(),
});

export async function GET(request) {
  const authUser = getAuthUser(request);
  if (!authUser) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    await dbConnect();
    const testimonials = await Testimonial.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, data: testimonials }, { status: 200 });
  } catch (error) {
    console.error("Fetch testimonials error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch testimonials." },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  const authUser = getAuthUser(request);
  if (!authUser) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = testimonialSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: "Invalid testimonial data.", errors: parsed.error.flatten() },
        { status: 400 }
      );
    }

    await dbConnect();
    const newTestimonial = await Testimonial.create(parsed.data);

    return NextResponse.json({ success: true, data: newTestimonial }, { status: 201 });
  } catch (error) {
    console.error("Create testimonial error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create testimonial." },
      { status: 500 }
    );
  }
}