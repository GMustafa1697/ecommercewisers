import { Cta } from "@/components/sections/Cta";
import { Hero } from "@/components/sections/Hero";
import { PortfolioPreview } from "@/components/sections/PortfolioPreview";
import { Process } from "@/components/sections/Process";
import { Services } from "@/components/sections/Services";
import { WhyUs } from "@/components/sections/WhyUs";

export default function Home() {
  return (
    <main id="main" className="flex-1">
      <Hero />
      <Services />
      <WhyUs />
      <Process />
      <PortfolioPreview />
      <Cta />
    </main>
  );
}
