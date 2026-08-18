import { NextResponse } from "next/server";
import { z } from "zod";
import dbConnect from "@/lib/dbConnect";
import Service from "@/models/Service";
import { getAuthUser } from "@/lib/auth";

const serviceUpdateSchema = z.object({
  title: z.string().min(2).optional(),
  description: z.string().min(10).optional(),
  icon: z.string().min(1).optional(),
  category: z.string().optional(),
  features: z.array(z.string()).optional(),
  order: z.number().optional(),
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
    const parsed = serviceUpdateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: "Invalid update data." },
        { status: 400 }
      );
    }

    await dbConnect();
    const updated = await Service.findByIdAndUpdate(id, parsed.data, {
      returnDocument: "after",
    }).lean();

    if (!updated) {
      return NextResponse.json({ success: false, message: "Service not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated }, { status: 200 });
  } catch (error) {
    console.error("Update service error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update service." },
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
    const deleted = await Service.findByIdAndDelete(id).lean();

    if (!deleted) {
      return NextResponse.json({ success: false, message: "Service not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Service deleted." }, { status: 200 });
  } catch (error) {
    console.error("Delete service error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete service." },
      { status: 500 }
    );
  }
}