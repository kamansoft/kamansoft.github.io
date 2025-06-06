
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Menu, X } from "lucide-react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById('home');
      if (heroSection) {
        const heroHeight = heroSection.offsetHeight;
        const scrollPosition = window.scrollY;
        
        // Check if 70% of hero section is scrolled past
        setIsScrolled(scrollPosition > heroHeight * 0.7);
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

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
      isScrolled 
        ? 'bg-gray-900/90 backdrop-blur-md border-gray-700/50 py-2 dark:bg-gray-900/90 dark:border-gray-700/50' 
        : 'bg-black/10 backdrop-blur-md border-white/5 py-4 dark:bg-black/20 dark:border-white/10'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo with white background same size as the logo */}
          <div className="flex items-center space-x-3">
            <div className={`bg-white rounded-md p-1 transition-all duration-300 ${
              isScrolled ? 'w-12 h-12' : 'w-14 h-14'
            } flex items-center justify-center`}>
              <img 
                src="/lovable-uploads/d84291bb-fa39-4250-b58b-d2de97da966a.png" 
                alt="Kamansoft Logo" 
                className={`transition-all duration-300 object-contain ${
                  isScrolled ? 'h-10 w-10' : 'h-12 w-12'
                }`}
              />
            </div>
            <div className="flex flex-col">
              <span className={`font-bold transition-all duration-300 ${
                isScrolled ? 'text-lg text-white' : 'text-xl text-white'
              }`}>
                Kamansoft
              </span>
              <span className={`text-xs transition-all duration-300 ${
                isScrolled ? 'text-gray-300' : 'text-white/80'
              }`}>
                Code Beyond Limits
              </span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('home')}
              className={`transition-colors ${
                isScrolled ? 'text-gray-200 hover:text-white' : 'text-white/90 hover:text-white'
              }`}
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('services')}
              className={`transition-colors ${
                isScrolled ? 'text-gray-200 hover:text-white' : 'text-white/90 hover:text-white'
              }`}
            >
              Services
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className={`transition-colors ${
                isScrolled ? 'text-gray-200 hover:text-white' : 'text-white/90 hover:text-white'
              }`}
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('portfolio')}
              className={`transition-colors ${
                isScrolled ? 'text-gray-200 hover:text-white' : 'text-white/90 hover:text-white'
              }`}
            >
              Portfolio
            </button>
            <button 
              onClick={() => scrollToSection('team')}
              className={`transition-colors ${
                isScrolled ? 'text-gray-200 hover:text-white' : 'text-white/90 hover:text-white'
              }`}
            >
              Team
            </button>
            <button 
              onClick={() => scrollToSection('blog')}
              className={`transition-colors ${
                isScrolled ? 'text-gray-200 hover:text-white' : 'text-white/90 hover:text-white'
              }`}
            >
              Blog
            </button>
            <ThemeToggle />
            <Button 
              onClick={() => scrollToSection('contact')}
              style={{ backgroundColor: 'hsl(210, 84%, 45%)', color: 'white' }}
              className="hover:opacity-90"
            >
              Contact Us
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-white"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className={`md:hidden mt-4 py-4 rounded-lg border transition-all duration-300 ${
            isScrolled 
              ? 'bg-gray-800/95 backdrop-blur-sm border-gray-600/50' 
              : 'bg-black/30 backdrop-blur-sm border-white/10'
          }`}>
            <div className="flex flex-col space-y-4 px-4">
              <button 
                onClick={() => scrollToSection('home')}
                className={`transition-colors text-left ${
                  isScrolled ? 'text-gray-200 hover:text-white' : 'text-white/90 hover:text-white'
                }`}
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('services')}
                className={`transition-colors text-left ${
                  isScrolled ? 'text-gray-200 hover:text-white' : 'text-white/90 hover:text-white'
                }`}
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className={`transition-colors text-left ${
                  isScrolled ? 'text-gray-200 hover:text-white' : 'text-white/90 hover:text-white'
                }`}
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('portfolio')}
                className={`transition-colors text-left ${
                  isScrolled ? 'text-gray-200 hover:text-white' : 'text-white/90 hover:text-white'
                }`}
              >
                Portfolio
              </button>
              <button 
                onClick={() => scrollToSection('team')}
                className={`transition-colors text-left ${
                  isScrolled ? 'text-gray-200 hover:text-white' : 'text-white/90 hover:text-white'
                }`}
              >
                Team
              </button>
              <button 
                onClick={() => scrollToSection('blog')}
                className={`transition-colors text-left ${
                  isScrolled ? 'text-gray-200 hover:text-white' : 'text-white/90 hover:text-white'
                }`}
              >
                Blog
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
