require("dotenv").config({ path: ".env.local" });

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || "http://localhost:3000",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  changefreq: "weekly",
  priority: 0.7,

  // Exclude admin panel and API routes from the sitemap — these should
  // never be indexed or crawled by search engines
  exclude: ["/x9k2-control-panel", "/x9k2-control-panel/*", "/api/*"],

  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/x9k2-control-panel", "/x9k2-control-panel/*", "/api/*"],
      },
    ],
  },

  // Dynamic project detail pages ([slug]) aren't static routes, so
  // next-sitemap can't discover them automatically. This function
  // fetches all active project slugs from MongoDB at build time and
  // adds them to the sitemap with today's actual last-modified date.
  additionalPaths: async (config) => {
    const result = [];

    try {
      // Lazy-require here since this file runs in a plain Node context
      // (not Next.js runtime) during the postbuild step
      const mongoose = require("mongoose");
      const MONGODB_URI = process.env.MONGODB_URI;

      if (!MONGODB_URI) {
        console.warn("MONGODB_URI not found — skipping dynamic project URLs in sitemap.");
        return result;
      }

      await mongoose.connect(MONGODB_URI);

      const ProjectSchema = new mongoose.Schema({
        slug: String,
        isActive: Boolean,
        updatedAt: Date,
      });

      const Project = mongoose.models.Project || mongoose.model("Project", ProjectSchema);

      const projects = await Project.find({ isActive: true }).select("slug updatedAt").lean();

      for (const project of projects) {
        result.push(
          await config.transform(config, `/projects/${project.slug}`, {
            lastmod: project.updatedAt ? new Date(project.updatedAt).toISOString() : undefined,
            changefreq: "monthly",
            priority: 0.6,
          })
        );
      }

      await mongoose.disconnect();
    } catch (error) {
      console.error("Failed to fetch project slugs for sitemap:", error);
    }

    return result;
  },
};