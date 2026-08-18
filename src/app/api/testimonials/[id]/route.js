import { NextResponse } from "next/server";
import { z } from "zod";
import dbConnect from "@/lib/dbConnect";
import Testimonial from "@/models/Testimonial";
import { getAuthUser } from "@/lib/auth";

const testimonialUpdateSchema = z.object({
  name: z.string().min(2).optional(),
  company: z.string().optional(),
  review: z.string().min(10).optional(),
  rating: z.number().min(1).max(5).optional(),
  avatar: z.string().optional(),
  isActive: z.boolean().optional(),
});

export async function PATCH(request, { params }) {
  const authUser = getAuthUser(request);
  if (!authUser) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const parsed = testimonialUpdateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: "Invalid update data." },
        { status: 400 }
      );
    }

    await dbConnect();
    const updated = await Testimonial.findByIdAndUpdate(id, parsed.data, {
      returnDocument: "after",
    }).lean();

    if (!updated) {
      return NextResponse.json({ success: false, message: "Testimonial not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated }, { status: 200 });
  } catch (error) {
    console.error("Update testimonial error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update testimonial." },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  const authUser = getAuthUser(request);
  if (!authUser) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;

    await dbConnect();
    const deleted = await Testimonial.findByIdAndDelete(id).lean();

    if (!deleted) {
      return NextResponse.json({ success: false, message: "Testimonial not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Testimonial deleted." }, { status: 200 });
  } catch (error) {
    console.error("Delete testimonial error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete testimonial." },
      { status: 500 }
    );
  }
}