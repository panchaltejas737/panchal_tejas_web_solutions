import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { getAuthUser } from "@/lib/auth";

export async function POST(request) {
  const authUser = getAuthUser(request);
  if (!authUser) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ success: false, message: "No file provided." }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = `data:${file.type};base64,${buffer.toString("base64")}`;

    const uploadResult = await cloudinary.uploader.upload(base64, {
      folder: "panchal-tejas-web-solution",
      resource_type: "image",
    });

    return NextResponse.json(
      { success: true, url: uploadResult.secure_url, publicId: uploadResult.public_id },
      { status: 200 }
    );
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, message: "Image upload failed. Please try again." },
      { status: 500 }
    );
  }
}