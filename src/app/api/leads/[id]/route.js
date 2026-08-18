import { NextResponse } from "next/server";
import { z } from "zod";
import dbConnect from "@/lib/dbConnect";
import Lead from "@/models/Lead";
import { getAuthUser } from "@/lib/auth";

const statusSchema = z.object({
  status: z.enum(["pending", "reviewed", "closed"]),
});

export async function PATCH(request, { params }) {
  const authUser = getAuthUser(request);
  if (!authUser) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const parsed = statusSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, message: "Invalid status value." },
        { status: 400 }
      );
    }

    await dbConnect();

    const updatedLead = await Lead.findByIdAndUpdate(
      id,
      { status: parsed.data.status },
      { returnDocument: "after" }
    ).lean();

    if (!updatedLead) {
      return NextResponse.json({ success: false, message: "Lead not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updatedLead }, { status: 200 });
  } catch (error) {
    console.error("Update lead error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update lead." },
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

    const deletedLead = await Lead.findByIdAndDelete(id).lean();

    if (!deletedLead) {
      return NextResponse.json({ success: false, message: "Lead not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Lead deleted." }, { status: 200 });
  } catch (error) {
    console.error("Delete lead error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete lead." },
      { status: 500 }
    );
  }
}