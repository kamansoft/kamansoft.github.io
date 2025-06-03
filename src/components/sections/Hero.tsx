
import { Button } from "@/components/ui/button";
import { Code, Smartphone, Globe, Zap, ArrowRight, Play } from "lucide-react";
import { HeroDataService } from "../../services/HeroDataService";
import { useMemo, useEffect, useState } from "react";

const Hero = () => {
  const dataService = useMemo(() => new HeroDataService(), []);
  const [headerData, setHeaderData] = useState({ title: '', highlightText: '', description: '' });
  const [buttons, setButtons] = useState({ primary: { text: '', icon: '' }, secondary: { text: '', icon: '' } });
  const [techStack, setTechStack] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [headerInfo, buttonsInfo, techStackInfo] = await Promise.all([
          dataService.getHeaderData(),
          dataService.getButtons(),
          dataService.getTechStack()
        ]);
        setHeaderData(headerInfo);
        setButtons(buttonsInfo);
        setTechStack(techStackInfo);
      } catch (error) {
        console.error('Failed to load hero data:', error);
      }
    };
    
    loadData();
  }, [dataService]);

  const iconMap = {
    Code,
    Smartphone,
    Globe,
    Zap,
    ArrowRight,
    Play
  };

  const getIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName as keyof typeof iconMap];
    return IconComponent ? <IconComponent className="h-5 w-5" /> : null;
  };

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-0"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.85)), url('/lovable-uploads/01b19036-6e1d-4eff-b683-41e93b9b1b99.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/20 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-white/30 rounded-full animate-ping delay-700"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-white/25 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-white/20 rounded-full animate-ping delay-500"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          {/* Main Content */}
          <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom duration-1000">
            <div className="space-y-4 md:space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
                {headerData.title}
                <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  {headerData.highlightText}
                </span>
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-white/90 leading-relaxed max-w-3xl mx-auto px-4">
                {headerData.description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center px-4">
              <Button 
                size="lg" 
                onClick={scrollToContact}
                className="text-lg px-6 md:px-8 py-3 md:py-4 rounded-full text-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
                style={{ backgroundColor: 'hsl(210, 84%, 45%)' }}
              >
                {buttons.primary.text}
                {getIcon(buttons.primary.icon)}
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-lg px-6 md:px-8 py-3 md:py-4 rounded-full border-2 border-white text-white hover:bg-white hover:text-gray-900 backdrop-blur-sm bg-white/10 shadow-xl transform hover:scale-105 transition-all duration-300 w-full sm:w-auto"
              >
                {getIcon(buttons.secondary.icon)}
                {buttons.secondary.text}
              </Button>
            </div>

            {/* Tech Stack Icons */}
            <div className="grid grid-cols-4 gap-4 md:gap-8 pt-12 md:pt-16 max-w-md mx-auto px-4">
              {techStack.map((tech) => (
                <div key={tech.id} className="flex flex-col items-center group">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:bg-white/20 transition-all duration-300 transform group-hover:scale-110">
                    {getIcon(tech.icon)}
                  </div>
                  <span className="text-white/80 text-xs md:text-sm mt-2">{tech.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
