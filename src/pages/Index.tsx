
import { useEffect } from "react";
import Hero from "@/components/sections/Hero";
import Navigation from "@/components/sections/Navigation";
import Approach from "@/components/sections/Approach";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
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
      <Approach />
      <Process />
      <Portfolio />
      <Team />
      <Blog />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
