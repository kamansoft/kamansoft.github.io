
import { useEffect } from "react";
import Hero from "@/components/sections/Hero";
import Navigation from "@/components/sections/Navigation";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import About from "@/components/sections/About";
import Portfolio from "@/components/sections/Portfolio";
import Team from "@/components/sections/Team";
import Blog from "@/components/sections/Blog";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

const Index = () => {
  useEffect(() => {
    console.log("Index page mounted");
  }, []);

  console.log("Index component rendering");

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors">
      <Navigation />
      <Hero />
      <Services />
      <Process />
      <Blog />
      <About />
      <Portfolio />
      <Team />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
