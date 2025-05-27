
import Hero from "@/components/sections/Hero";
import Navigation from "@/components/sections/Navigation";
import Services from "@/components/sections/Services";
import About from "@/components/sections/About";
import Portfolio from "@/components/sections/Portfolio";
import Team from "@/components/sections/Team";
import Blog from "@/components/sections/Blog";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <Hero />
      <Services />
      <About />
      <Portfolio />
      <Team />
      <Blog />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
