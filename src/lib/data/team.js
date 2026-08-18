import dbConnect from "@/lib/dbConnect";
import TeamMember from "@/models/TeamMember";

// NOTE: Returns empty until the Team admin manager is built (not created
// yet). Kept consistent with the rest of the site — no fake/placeholder
// team members are ever shown.
export async function getTeamMembers() {
  try {
    await dbConnect();
    const members = await TeamMember.find({ isActive: true })
      .sort({ order: 1, createdAt: -1 })
      .lean();

    return JSON.parse(JSON.stringify(members));
  } catch (error) {
    console.error("Failed to fetch team members:", error);
    return [];
  }
}