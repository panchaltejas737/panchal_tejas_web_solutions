import { NextResponse } from "next/server";
import { z } from "zod";
import dbConnect from "@/lib/dbConnect";
import TeamMember from "@/models/TeamMember";
import { getAuthUser } from "@/lib/auth";

const teamMemberSchema = z.object({
  name: z.string().min(2),
  role: z.string().min(2),
  department: z.enum(["Developers", "Designers", "Management"]),
  corporatePhoto: z.string().min(1),
  funPhoto: z.string().min(1),
  githubUrl: z.string().optional(),
  linkedinUrl: z.string().optional(),
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
    const members = await TeamMember.find().sort({ order: 1, createdAt: -1 }).lean();
    return NextResponse.json({ success: true, data: members }, { status: 200 });
  } catch (error) {
    console.error("Fetch team members error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch team members." },
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
    const parsed = teamMemberSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: "Invalid team member data.", errors: parsed.error.flatten() },
        { status: 400 }
      );
    }

    await dbConnect();
    const newMember = await TeamMember.create(parsed.data);

    return NextResponse.json({ success: true, data: newMember }, { status: 201 });
  } catch (error) {
    console.error("Create team member error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to create team member." },
      { status: 500 }
    );
  }
}