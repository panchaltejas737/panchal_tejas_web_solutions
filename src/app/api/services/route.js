import { NextResponse } from "next/server";
import { z } from "zod";
import dbConnect from "@/lib/dbConnect";
import Service from "@/models/Service";
import { getAuthUser } from "@/lib/auth";

const serviceSchema = z.object({
  title: z.string().min(2),
  description: z.string().min(10),
  icon: z.string().min(1),
  category: z.string().optional(),
  features: z.array(z.string()).optional(),
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
    const services = await Service.find().sort({ order: 1, createdAt: -1 }).lean();
    return NextResponse.json({ success: true, data: services }, { status: 200 });
  } catch (error) {
    console.error("Fetch services error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch services." },
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
    const parsed = serviceSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: "Invalid service data.", errors: parsed.error.flatten() },
        { status: 400 }
      );
    }

    await dbConnect();
    const newService = await Service.create(parsed.data);

    return NextResponse.json({ success: true, data: newService }, { status: 201 });
  } catch (error) {
    console.error("Create service error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create service." },
      { status: 500 }
    );
  }
}