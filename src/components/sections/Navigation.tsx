
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentSection, setCurrentSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('home');
      if (heroSection) {
        const heroHeight = heroSection.offsetHeight;
        const scrollPosition = window.scrollY;
        const halfHeroHeight = heroHeight / 2;
        
        setIsScrolled(scrollPosition > halfHeroHeight);
      }

      // Detect current section
      const sections = ['home', 'services', 'about', 'portfolio', 'team', 'contact'];
      const navbarHeight = 80; // Account for navbar height
      
      for (const sectionId of sections) {
        const section = document.getElementById(sectionId);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= navbarHeight && rect.bottom > navbarHeight) {
            setCurrentSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  // Determine if current section has dark background
  const isDarkSection = currentSection === 'home' || currentSection === 'portfolio';
  const textColor = isDarkSection ? 'text-white' : 'text-gray-900';
  const textColorHover = isDarkSection ? 'text-white/90 hover:text-white' : 'text-gray-700 hover:text-gray-900';

  return (
    <nav className={`fixed top-0 left-0 right-0 bg-black/10 backdrop-blur-md z-50 border-b border-white/5 transition-all duration-300 ${
      isScrolled ? 'py-2' : 'py-4'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo with white background only behind the image */}
          <div className="flex items-center space-x-3">
            <div className="bg-white rounded-lg p-1">
              <img 
                src="/lovable-uploads/d84291bb-fa39-4250-b58b-d2de97da966a.png" 
                alt="Kamansoft Logo" 
                className={`transition-all duration-300 ${isScrolled ? 'h-6 w-6' : 'h-8 w-8'}`}
              />
            </div>
            <span className={`font-bold transition-all duration-300 ${
              isScrolled ? 'text-lg' : 'text-xl'
            } ${textColor}`}>
              Kamansoft
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('home')}
              className={`transition-colors ${textColorHover}`}
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('services')}
              className={`transition-colors ${textColorHover}`}
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className={`transition-colors ${textColorHover}`}
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('portfolio')}
              className={`transition-colors ${textColorHover}`}
            >
              Portfolio
            </button>
            <button 
              onClick={() => scrollToSection('team')}
              className={`transition-colors ${textColorHover}`}
            >
              Team
            </button>
            <Button 
              onClick={() => scrollToSection('contact')}
              style={{ backgroundColor: 'hsl(210, 84%, 45%)', color: 'white' }}
              className="hover:opacity-90"
            >
              Contact Us
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-2 ${textColor}`}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 py-4 bg-black/30 backdrop-blur-sm rounded-lg border border-white/10">
            <div className="flex flex-col space-y-4 px-4">
              <button 
                onClick={() => scrollToSection('home')}
                className={`transition-colors text-left ${textColorHover}`}
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('services')}
                className={`transition-colors text-left ${textColorHover}`}
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className={`transition-colors text-left ${textColorHover}`}
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('portfolio')}
                className={`transition-colors text-left ${textColorHover}`}
              >
                Portfolio
              </button>
              <button 
                onClick={() => scrollToSection('team')}
                className={`transition-colors text-left ${textColorHover}`}
              >
                Team
              </button>
              <Button 
                onClick={() => scrollToSection('contact')}
                style={{ backgroundColor: 'hsl(210, 84%, 45%)', color: 'white' }}
                className="hover:opacity-90 w-full"
              >
                Contact Us
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
