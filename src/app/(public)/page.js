import HeroSection from "@/components/home/HeroSection/HeroSection";
import ServicesSection from "@/components/home/ServicesSection/ServicesSection";
import ProjectsSection from "@/components/home/ProjectsSection/ProjectsSection";
import WhyChooseUsSection from "@/components/home/WhyChooseUsSection/WhyChooseUsSection";
import StatsSection from "@/components/home/StatsSection/StatsSection";
import TestimonialsSection from "@/components/home/TestimonialsSection/TestimonialsSection";
import TechStackSection from "@/components/home/TechStackSection/TechStackSection";
import CTABanner from "@/components/home/CTABanner/CTABanner";
import ContactFormSection from "@/components/home/ContactFormSection/ContactFormSection";
import { siteConfig } from "@/config/siteConfig";
import FloatingWhatsApp from "@/components/home/FloatingWhatsApp/FloatingWhatsApp";

export const metadata = {
  title: `${siteConfig.name} | Modern Web Development Agency`,
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${siteConfig.name} | Modern Web Development Agency`,
    description: siteConfig.description,
    url: siteConfig.url,
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: siteConfig.name }],
  },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TechStackSection />
      <ServicesSection />
      <ProjectsSection />
      <WhyChooseUsSection />
      <StatsSection />
      <TestimonialsSection />
      <CTABanner />
      <ContactFormSection />
      <FloatingWhatsApp />
    </>
  );
}