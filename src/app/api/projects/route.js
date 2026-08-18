import { NextResponse } from "next/server";
import { z } from "zod";
import dbConnect from "@/lib/dbConnect";
import Project from "@/models/Project";
import { getAuthUser } from "@/lib/auth";

const projectSchema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2),
  category: z.string().min(1),
  techUsed: z.array(z.string()).optional(),
  thumbnail: z.string().min(1),
  challenge: z.string().optional(),
  solution: z.string().optional(),
  result: z.string().optional(),
  clientName: z.string().optional(),
  liveUrl: z.string().optional(),
  featured: z.boolean().optional(),
  order: z.number().optional(),
  isActive: z.boolean().optional(),
});

export async function GET(request) {
  const authUser = getAuthUser(request);
  if (!authUser) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    await dbConnect();
    const projects = await Project.find().sort({ order: 1, createdAt: -1 }).lean();
    return NextResponse.json({ success: true, data: projects }, { status: 200 });
  } catch (error) {
    console.error("Fetch projects error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch projects." },
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
    const parsed = projectSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: "Invalid project data.", errors: parsed.error.flatten() },
        { status: 400 }
      );
    }

    await dbConnect();

    const existingSlug = await Project.findOne({ slug: parsed.data.slug });
    if (existingSlug) {
      return NextResponse.json(
        { success: false, message: "A project with this slug already exists. Choose a different slug." },
        { status: 409 }
      );
    }

    const newProject = await Project.create(parsed.data);

    return NextResponse.json({ success: true, data: newProject }, { status: 201 });
  } catch (error) {
    console.error("Create project error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create project." },
      { status: 500 }
    );
  }
}