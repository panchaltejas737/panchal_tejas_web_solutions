import ContactHero from "@/components/contact/ContactHero/ContactHero";
import ContactFormSection from "@/components/home/ContactFormSection/ContactFormSection";
import LocationMap from "@/components/contact/LocationMap/LocationMap";
import FAQAccordion from "@/components/contact/FAQAccordion/FAQAccordion";
import { siteConfig } from "@/config/siteConfig";

const pageTitle = "Contact Us";
const pageDescription =
  "Get in touch with Panchal Tejas Web Solution to start your next web development project.";

export const metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: `${pageTitle} | ${siteConfig.name}`,
    description: pageDescription,
    url: `${siteConfig.url}/contact`,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: pageTitle }],
  },
  twitter: {
    title: `${pageTitle} | ${siteConfig.name}`,
    description: pageDescription,
    images: ["/og-image.png"],
  },
};

export default function ContactPage() {
  return (
    <>
      <ContactHero />
      <ContactFormSection />
      <LocationMap />
      <FAQAccordion />
    </>
  );
}