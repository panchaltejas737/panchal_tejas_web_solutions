import dbConnect from "@/lib/dbConnect";
import Service from "@/models/Service";

export async function getServices() {
  try {
    await dbConnect();
    const services = await Service.find({ isActive: true })
      .sort({ order: 1, createdAt: -1 })
      .lean();

    return JSON.parse(JSON.stringify(services));
  } catch (error) {
    console.error("Failed to fetch services:", error);
    return [];
  }
}