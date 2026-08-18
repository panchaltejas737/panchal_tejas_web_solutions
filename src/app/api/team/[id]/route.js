import { NextResponse } from "next/server";
import { z } from "zod";
import dbConnect from "@/lib/dbConnect";
import TeamMember from "@/models/TeamMember";
import { getAuthUser } from "@/lib/auth";

const teamMemberUpdateSchema = z.object({
  name: z.string().min(2).optional(),
  role: z.string().min(2).optional(),
  department: z.enum(["Developers", "Designers", "Management"]).optional(),
  corporatePhoto: z.string().min(1).optional(),
  funPhoto: z.string().min(1).optional(),
  githubUrl: z.string().optional(),
  linkedinUrl: z.string().optional(),
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
    const parsed = teamMemberUpdateSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: "Invalid update data." },
        { status: 400 }
      );
    }

    await dbConnect();
    const updated = await TeamMember.findByIdAndUpdate(id, parsed.data, {
      returnDocument: "after",
    }).lean();

    if (!updated) {
      return NextResponse.json({ success: false, message: "Team member not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updated }, { status: 200 });
  } catch (error) {
    console.error("Update team member error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update team member." },
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
    const deleted = await TeamMember.findByIdAndDelete(id).lean();

    if (!deleted) {
      return NextResponse.json({ success: false, message: "Team member not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Team member deleted." }, { status: 200 });
  } catch (error) {
    console.error("Delete team member error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete team member." },
      { status: 500 }
    );
  }
}