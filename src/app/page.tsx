import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import HeroCarousel from "@/components/HeroCarousel";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import { TechVacuumProvider } from "@/lib/TechVacuumContext";

export default function Home() {
  return (
    <TechVacuumProvider>
      <Nav />
      <Hero />
      <About />
      <HeroCarousel />
      <Services />
      <Projects />
      <FAQ />
      <Footer />
    </TechVacuumProvider>
  );
}
