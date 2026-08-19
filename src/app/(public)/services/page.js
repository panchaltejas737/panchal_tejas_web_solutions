import ServicesHero from "@/components/services/ServicesHero/ServicesHero";
import ServicesList from "@/components/services/ServicesList/ServicesList";
import CTABanner from "@/components/home/CTABanner/CTABanner";
import { siteConfig } from "@/config/siteConfig";

export const dynamic = "force-dynamic";

const pageTitle = "Our Services";
const pageDescription =
  "Explore our full range of web development, e-commerce, and digital solutions tailored to grow your business.";

export const metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/services",
  },
  openGraph: {
    title: `${pageTitle} | ${siteConfig.name}`,
    description: pageDescription,
    url: `${siteConfig.url}/services`,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: pageTitle }],
  },
  twitter: {
    title: `${pageTitle} | ${siteConfig.name}`,
    description: pageDescription,
    images: ["/og-image.png"],
  },
};

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <ServicesList />
      <CTABanner />
    </>
  );
}