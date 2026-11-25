import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Menu, X, Github } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { siteConfig, SectionKey } from "@/services/SiteConfigService";

const links: [SectionKey, string, string][] = [
  ["hero", "home", "Home"], ["services", "services", "Services"], ["approach", "approach", "About"],
  ["portfolio", "portfolio", "Portfolio"], ["team", "team", "Team"], ["blog", "blog", "Blog"],
].filter(([k]) => siteConfig.isEnabled(k as SectionKey)) as [SectionKey, string, string][];

const Navigation = () => {
  const { t } = useLanguage();
  const label = (id: string) => t.nav[id as keyof typeof t.nav] ?? id;
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

  const handleGitHubClick = () => {
    window.open('https://github.com/kamansoft', '_blank', 'noopener,noreferrer');
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
      isScrolled 
        ? 'bg-ink/90 backdrop-blur-md border-ink-border py-2 shadow-sm' 
        : 'bg-ink/40 backdrop-blur-md border-ink-border/50 py-4'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo: mark untouched on a narrow white canvas; the breathing glow fades to a whisper once the bar is compact */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className={`pointer-events-none absolute inset-0 rounded-md transition-opacity duration-500 ${
                isScrolled ? 'opacity-40' : 'opacity-100'
              }`}>
                <div className="h-full w-full rounded-md animate-logo-breathe" />
              </div>
              <div className={`relative bg-white rounded-md transition-all duration-300 ${
                isScrolled ? 'w-12 h-12 p-[2px]' : 'w-14 h-14 p-[3px]'
              } flex items-center justify-center`}>
                <img 
                  src="/lovable-uploads/d84291bb-fa39-4250-b58b-d2de97da966a.png" 
                  alt={t.nav.logoAlt} 
                  className={`transition-all duration-300 object-contain ${
                    isScrolled ? 'h-10 w-10' : 'h-12 w-12'
                  }`}
                />
              </div>
            </div>
            <div className="flex flex-col">
              <span className={`font-bold transition-all duration-300 ${
                isScrolled ? 'text-lg text-ink-foreground' : 'text-xl text-ink-foreground'
              }`}>
                Kamansoft
              </span>
              <span className={`text-xs transition-all duration-300 ${
                isScrolled ? 'text-ink-muted' : 'text-ink-muted'
              }`}>
                {t.nav.slogan}
              </span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {links.map(([, id]) => (
              <button key={id}
                onClick={() => scrollToSection(id)}
                className={`transition-colors ${
                  isScrolled ? 'text-ink-foreground/80 hover:text-ink-foreground' : 'text-ink-foreground/80 hover:text-ink-foreground'
                }`}
              >
                {label(id)}
              </button>
            ))}
            <LanguageSwitcher />
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={handleGitHubClick}
              className="text-ink-foreground hover:bg-ink-foreground/10"
              title={t.nav.github}
            >
              <Github className="h-5 w-5" />
            </Button>
            <Button 
              onClick={() => scrollToSection('contact')}
              className="bg-signal text-signal-foreground hover:bg-signal/90 font-semibold"
            >
              {t.nav.contact}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <LanguageSwitcher />
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={handleGitHubClick}
              className="text-ink-foreground hover:bg-ink-foreground/10"
              title={t.nav.github}
            >
              <Github className="h-5 w-5" />
            </Button>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={t.nav.menu}
              className="p-2 text-ink-foreground"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className={`md:hidden mt-4 py-4 rounded-lg border transition-all duration-300 ${
            isScrolled 
              ? 'bg-ink/95 backdrop-blur-sm border-ink-border' 
              : 'bg-ink/90 backdrop-blur-sm border-ink-border'
          }`}>
            <div className="flex flex-col space-y-4 px-4">
              {links.map(([, id]) => (
              <button key={id}
                onClick={() => scrollToSection(id)}
                className={`transition-colors text-left ${
                  isScrolled ? 'text-ink-foreground/80 hover:text-ink-foreground' : 'text-ink-foreground/80 hover:text-ink-foreground'
                }`}
              >
                {label(id)}
              </button>
            ))}
            <Button 
                onClick={() => scrollToSection('contact')}
                className="bg-signal text-signal-foreground hover:bg-signal/90 font-semibold w-full"
              >
                {t.nav.contact}
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
