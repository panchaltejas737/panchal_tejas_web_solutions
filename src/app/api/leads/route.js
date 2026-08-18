import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Lead from "@/models/Lead";
import { getAuthUser } from "@/lib/auth";

export async function GET(request) {
  const authUser = getAuthUser(request);
  if (!authUser) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    await dbConnect();
    const leads = await Lead.find().sort({ createdAt: -1 }).lean();

    return NextResponse.json({ success: true, data: leads }, { status: 200 });
  } catch (error) {
    console.error("Fetch leads error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch leads." },
      { status: 500 }
    );
  }
}