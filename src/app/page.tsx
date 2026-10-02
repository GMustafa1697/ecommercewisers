import { Contact } from "@/components/sections/Contact";
import { Features } from "@/components/sections/Features";
import { Hero } from "@/components/sections/Hero";
import { Platforms } from "@/components/sections/Platforms";
import { PortfolioPreview } from "@/components/sections/PortfolioPreview";
import { Process } from "@/components/sections/Process";
import { Reviews } from "@/components/sections/Reviews";
import { Services } from "@/components/sections/Services";
import { WhyUs } from "@/components/sections/WhyUs";

export default function Home() {
  return (
    <main id="main" className="flex-1">
      <Hero />
      <Platforms />
      <Features />
      <Services />
      <WhyUs />
      <Process />
      <PortfolioPreview />
      <Reviews />
      <Contact />
    </main>
  );
}
