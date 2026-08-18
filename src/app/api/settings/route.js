import { NextResponse } from "next/server";
import { z } from "zod";
import dbConnect from "@/lib/dbConnect";
import Setting from "@/models/Setting";
import { getAuthUser } from "@/lib/auth";

const settingsSchema = z.object({
  projectsDelivered: z.number().min(0),
  happyClients: z.number().min(0),
  yearsExperience: z.number().min(0),
  clientSatisfaction: z.number().min(0).max(100),
});

export async function GET(request) {
  const authUser = getAuthUser(request);
  if (!authUser) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    await dbConnect();
    let settings = await Setting.findOne({ key: "site_stats" }).lean();

    if (!settings) {
      settings = await Setting.create({ key: "site_stats" });
      settings = settings.toObject();
    }

    return NextResponse.json({ success: true, data: settings }, { status: 200 });
  } catch (error) {
    console.error("Fetch settings error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch settings." },
      { status: 500 }
    );
  }
}

export async function PATCH(request) {
  const authUser = getAuthUser(request);
  if (!authUser) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = settingsSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: "Invalid settings data.", errors: parsed.error.flatten() },
        { status: 400 }
      );
    }

    await dbConnect();

    const updated = await Setting.findOneAndUpdate(
      { key: "site_stats" },
      { ...parsed.data, key: "site_stats" },
      { new: true, upsert: true }
    ).lean();

    return NextResponse.json({ success: true, data: updated }, { status: 200 });
  } catch (error) {
    console.error("Update settings error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update settings." },
      { status: 500 }
    );
  }
}