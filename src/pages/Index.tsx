
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Stakeholders } from "@/components/Stakeholders";
import { Services } from "@/components/Services";
import { Events } from "@/components/Events";
import { Contact } from "@/components/Contact";
import { CTA } from "@/components/CTA";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <Navigation />
      <Hero />
      <Features />
      <Stakeholders />
      <Services />
      <Events />
      <Contact />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;
