import dbConnect from "@/lib/dbConnect";
import Setting from "@/models/Setting";

export async function getSiteStats() {
  try {
    await dbConnect();
    const settings = await Setting.findOne({ key: "site_stats" }).lean();

    if (!settings) return null;

    // Only return stats if at least one real value has been set by admin —
    // otherwise treat as "no data yet" so the section stays hidden (no fake zeros shown)
    const hasRealData =
      settings.projectsDelivered > 0 ||
      settings.happyClients > 0 ||
      settings.yearsExperience > 0 ||
      settings.clientSatisfaction > 0;

    if (!hasRealData) return null;

    return {
      projectsDelivered: settings.projectsDelivered,
      happyClients: settings.happyClients,
      yearsExperience: settings.yearsExperience,
      clientSatisfaction: settings.clientSatisfaction,
    };
  } catch (error) {
    console.error("Failed to fetch site stats:", error);
    return null;
  }
}