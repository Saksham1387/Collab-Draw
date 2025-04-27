import { LandingHeader } from "@/components/Landing/landing-header";
import { HeroSection } from "@/components/Landing/hero";
import { FeatureSection } from "@/components/Landing/feature";
import { HowItWorksSection } from "@/components/Landing/how-it-work";
import { TestimonialSection } from "@/components/Landing/testimonial";
import { FooterSection } from "@/components/Landing/footer";
import { CTASection } from "@/components/Landing/cta";

export default function Home() {
  return (
    <div className="flex  flex-col items-center justify-center">
      <LandingHeader />
      <main className="flex-1 ">
        <HeroSection />
        <FeatureSection />
        <HowItWorksSection />
        <TestimonialSection />
        <CTASection />
      </main>
      <FooterSection />
    </div>
  );
}
