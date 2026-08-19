import AboutHero from "@/components/about/AboutHero/AboutHero";
import OurStorySection from "@/components/about/OurStorySection/OurStorySection";
import CoreValuesSection from "@/components/about/CoreValuesSection/CoreValuesSection";
import TeamGrid from "@/components/about/TeamGrid/TeamGrid";
import ProcessTimelineSection from "@/components/about/ProcessTimelineSection/ProcessTimelineSection";
import CTABanner from "@/components/home/CTABanner/CTABanner";
import { getTeamMembers } from "@/lib/data/team";
import { siteConfig } from "@/config/siteConfig";

export const dynamic = "force-dynamic";

const pageTitle = "About Us";
const pageDescription =
  "Learn about Panchal Tejas Web Solution — our story, our values, and how we approach every web development project.";

export const metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: `${pageTitle} | ${siteConfig.name}`,
    description: pageDescription,
    url: `${siteConfig.url}/about`,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: pageTitle }],
  },
  twitter: {
    title: `${pageTitle} | ${siteConfig.name}`,
    description: pageDescription,
    images: ["/og-image.png"],
  },
};

export default async function AboutPage() {
  const teamMembers = await getTeamMembers();

  return (
    <>
      <AboutHero />
      <OurStorySection />
      <CoreValuesSection />
      <TeamGrid members={teamMembers} />
      <ProcessTimelineSection />
      <CTABanner />
    </>
  );
}