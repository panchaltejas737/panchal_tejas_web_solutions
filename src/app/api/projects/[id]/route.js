import { NextResponse } from "next/server";
import { z } from "zod";
import dbConnect from "@/lib/dbConnect";
import Project from "@/models/Project";
import { getAuthUser } from "@/lib/auth";

const projectUpdateSchema = z.object({
  title: z.string().min(2).optional(),
  slug: z.string().min(2).optional(),
  category: z.string().min(1).optional(),
  techUsed: z.array(z.string()).optional(),
  thumbnail: z.string().min(1).optional(),
  challenge: z.string().optional(),
  solution: z.string().optional(),
  result: z.string().optional(),
  clientName: z.string().optional(),
  liveUrl: z.string().optional(),
  featured: z.boolean().optional(),
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
    const parsed = projectUpdateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: "Invalid update data." },
        { status: 400 }
      );
    }

    await dbConnect();

    if (parsed.data.slug) {
      const existingSlug = await Project.findOne({
        slug: parsed.data.slug,
        _id: { $ne: id },
      });
      if (existingSlug) {
        return NextResponse.json(
          { success: false, message: "A project with this slug already exists." },
          { status: 409 }
        );
      }
    }

    const updated = await Project.findByIdAndUpdate(id, parsed.data, {
      returnDocument: "after",
    }).lean();

    if (!updated) {
      return NextResponse.json({ success: false, message: "Project not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated }, { status: 200 });
  } catch (error) {
    console.error("Update project error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update project." },
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
    const deleted = await Project.findByIdAndDelete(id).lean();

    if (!deleted) {
      return NextResponse.json({ success: false, message: "Project not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Project deleted." }, { status: 200 });
  } catch (error) {
    console.error("Delete project error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete project." },
      { status: 500 }
    );
  }
}