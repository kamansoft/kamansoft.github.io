import type { ComponentType } from "react";
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
import WhatsAppBubble from "@/components/WhatsAppBubble";
import { siteConfig, SectionKey } from "@/services/SiteConfigService";

const sections: [SectionKey, ComponentType][] = [
  ["hero", Hero], ["services", Services], ["approach", Approach], ["process", Process],
  ["portfolio", Portfolio], ["team", Team], ["blog", Blog], ["contact", Contact], ["footer", Footer],
];

const Index = () => (
  <div className="min-h-screen bg-background text-foreground transition-colors">
    <Navigation />
    {sections.filter(([k]) => siteConfig.isEnabled(k)).map(([k, C]) => <C key={k} />)}
    {siteConfig.isEnabled("contact") && <WhatsAppBubble />}
  </div>
);

export default Index;
