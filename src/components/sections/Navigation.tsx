
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-black/10 backdrop-blur-md z-50 border-b border-white/5">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo with white background */}
          <div className="flex items-center space-x-3 bg-white rounded-lg px-3 py-2">
            <img 
              src="/lovable-uploads/d84291bb-fa39-4250-b58b-d2de97da966a.png" 
              alt="Kamansoft Logo" 
              className="h-8 w-8"
            />
            <span className="text-xl font-bold text-gray-800">
              Kamansoft
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('home')}
              className="text-white/90 hover:text-white transition-colors"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('services')}
              className="text-white/90 hover:text-white transition-colors"
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="text-white/90 hover:text-white transition-colors"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('portfolio')}
              className="text-white/90 hover:text-white transition-colors"
            >
              Portfolio
            </button>
            <button 
              onClick={() => scrollToSection('team')}
              className="text-white/90 hover:text-white transition-colors"
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
            className="md:hidden p-2 text-white"
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
                className="text-white/90 hover:text-white transition-colors text-left"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('services')}
                className="text-white/90 hover:text-white transition-colors text-left"
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-white/90 hover:text-white transition-colors text-left"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('portfolio')}
                className="text-white/90 hover:text-white transition-colors text-left"
              >
                Portfolio
              </button>
              <button 
                onClick={() => scrollToSection('team')}
                className="text-white/90 hover:text-white transition-colors text-left"
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
