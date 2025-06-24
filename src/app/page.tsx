import HeroBanner from "@/components/home/hero-banner";
import OurProjectSection from "@/components/home/our-project-section";
import ProgrammingLanguagesSection from "@/components/home/programming-language-section";
import ServicesSection from "@/components/home/services-section";
import WorkProcessSection from "@/components/home/work-process-section";


export default function Home() {
  return (
    <main className="w-full min-h-[100vh] bg-background">
      {/* Hero Banner */}
      <HeroBanner />

      {/* Work Process Section */}
      <WorkProcessSection />

      {/* Services Section */}
      <ServicesSection />

      {/* Our Project Section */}
      <OurProjectSection />

      {/* Programming Languages Section */}
      <ProgrammingLanguagesSection />

    </main>
  );
}
