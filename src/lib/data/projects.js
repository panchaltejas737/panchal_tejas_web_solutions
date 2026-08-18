import dbConnect from "@/lib/dbConnect";
import Project from "@/models/Project";

export async function getFeaturedProjects() {
  try {
    await dbConnect();
    const projects = await Project.find({ isActive: true, featured: true })
      .sort({ order: 1, createdAt: -1 })
      .limit(4)
      .lean();

    return JSON.parse(JSON.stringify(projects));
  } catch (error) {
    console.error("Failed to fetch featured projects:", error);
    return [];
  }
}

export async function getAllProjects() {
  try {
    await dbConnect();
    const projects = await Project.find({ isActive: true })
      .sort({ order: 1, createdAt: -1 })
      .lean();

    return JSON.parse(JSON.stringify(projects));
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return [];
  }
}

export async function getProjectBySlug(slug) {
  try {
    await dbConnect();
    const project = await Project.findOne({ slug, isActive: true }).lean();

    if (!project) return null;
    return JSON.parse(JSON.stringify(project));
  } catch (error) {
    console.error("Failed to fetch project by slug:", error);
    return null;
  }
}

// Used by generateStaticParams to pre-build every active project's
// detail page at build time. Only returns the slug field for efficiency.
export async function getAllProjectSlugs() {
  try {
    await dbConnect();
    const projects = await Project.find({ isActive: true }).select("slug").lean();
    return projects.map((p) => ({ slug: p.slug }));
  } catch (error) {
    console.error("Failed to fetch project slugs:", error);
    return [];
  }
}