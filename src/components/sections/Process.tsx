
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect, useRef } from "react";
import ProcessBackground from "./process/ProcessBackground";
import ProcessTransition from "./process/ProcessTransition";
import ProcessTimeline from "./process/ProcessTimeline";
import ContinuousImprovement from "./process/ContinuousImprovement";
import { conceptSteps, agileSteps } from "./process/ProcessSteps";

const Process = () => {
  const [activeTab, setActiveTab] = useState("conceptualizing");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isNavigationTriggered, setIsNavigationTriggered] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const conceptualizingContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Listen for navigation clicks to prevent automatic transition
    const handleNavigationClick = (event: Event) => {
      const target = event.target as HTMLElement;
      
      // Check if the click is on a navigation element or its children
      const isNavClick = target.closest('nav') || 
                        target.closest('[data-nav]') || 
                        target.closest('button[onclick*="scrollTo"]') ||
                        target.closest('a[href*="#"]') ||
                        target.hasAttribute('data-scroll-to') ||
                        target.closest('[data-scroll-to]');
      
      if (isNavClick) {
        console.log('Navigation click detected, preventing auto-transition');
        setIsNavigationTriggered(true);
        // Reset the flag after a longer delay to ensure scroll is complete
        setTimeout(() => {
          setIsNavigationTriggered(false);
        }, 2000);
      }
    };

    // Add event listener to the entire document to catch all clicks
    document.addEventListener('click', handleNavigationClick, true);

    return () => {
      document.removeEventListener('click', handleNavigationClick, true);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !conceptualizingContentRef.current || isNavigationTriggered) return;
      
      const section = sectionRef.current;
      const conceptContent = conceptualizingContentRef.current;
      const sectionRect = section.getBoundingClientRect();
      const contentRect = conceptContent.getBoundingClientRect();
      
      // Check if we're in the process section and on conceptualizing tab
      if (activeTab === "conceptualizing" && sectionRect.top <= 100) {
        // Check if we've scrolled to the end of conceptualizing content
        if (contentRect.bottom <= window.innerHeight * 0.8) {
          console.log('Auto-transitioning from conceptualizing to development');
          // Start transition effect
          setIsTransitioning(true);
          
          // Scroll back to the top of the section more slowly
          section.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start'
          });
          
          // Switch to development tab after shorter transition effect
          setTimeout(() => {
            // Trigger flash effect for automatic transition
            setIsFlashing(true);
            setActiveTab("development");
            
            // Remove flash effect after animation
            setTimeout(() => {
              setIsFlashing(false);
            }, 50);
            
            setTimeout(() => {
              setIsTransitioning(false);
            }, 300);
          }, 500);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeTab, isNavigationTriggered]);

  const handleTabChange = (value: string) => {
    // Trigger flash effect
    setIsFlashing(true);
    setActiveTab(value);
    
    // Remove flash effect after animation
    setTimeout(() => {
      setIsFlashing(false);
    }, 50);
  };

  return (
    <section 
      ref={sectionRef} 
      id="process" 
      className={`py-20 relative overflow-hidden transition-all duration-1000 ${
        activeTab === "conceptualizing" 
          ? "bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-muted/50" 
          : "bg-gradient-to-br from-green-50/50 via-blue-50/30 to-muted/50"
      }`}
    >
      <ProcessBackground activeTab={activeTab} />
      <ProcessTransition isTransitioning={isTransitioning} />

      <div className="container mx-auto px-4 relative z-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Our Solution Building Process
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A proven methodology that ensures we understand your needs and deliver the right solution
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8 relative z-30">
            <TabsTrigger 
              value="conceptualizing" 
              className={`relative overflow-hidden transition-all duration-300 ${
                activeTab === "conceptualizing" 
                  ? `bg-blue-100 text-blue-900 shadow-md ${
                      isFlashing ? 'bg-white text-blue-600 shadow-xl shadow-white/80 brightness-150' : ''
                    }` 
                  : 'opacity-70'
              }`}
            >
              <span className="relative z-10">Conceptualizing</span>
              {activeTab === "conceptualizing" && (
                <div className={`absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 ${
                  isFlashing ? 'bg-white/90' : ''
                }`}></div>
              )}
            </TabsTrigger>
            
            <TabsTrigger 
              value="development" 
              className={`relative overflow-hidden transition-all duration-300 ${
                activeTab === "development" 
                  ? `bg-green-100 text-green-900 shadow-md ${
                      isFlashing ? 'bg-white text-green-600 shadow-xl shadow-white/80 brightness-150' : ''
                    }` 
                  : 'opacity-70'
              }`}
            >
              <span className="relative z-10">Development</span>
              {activeTab === "development" && (
                <div className={`absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 ${
                  isFlashing ? 'bg-white/90' : ''
                }`}></div>
              )}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="conceptualizing" className="mt-8">
            <div ref={conceptualizingContentRef} className={`transition-all duration-500 ${
              isTransitioning ? "opacity-50 blur-sm" : "opacity-100 blur-0"
            }`}>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-semibold text-foreground mb-2">
                  From Idea to MVP Definition
                </h3>
                <p className="text-muted-foreground mb-4">
                  Understanding your vision and creating a solid foundation for development
                </p>
                <div className="max-w-2xl mx-auto bg-primary/10 border border-primary/20 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">MVP (Minimum Viable Product)</strong> is the simplest version of your product that includes only the core features needed to solve your main problem and deliver value to users.
                  </p>
                </div>
              </div>
              <ProcessTimeline 
                steps={conceptSteps} 
                totalDuration="Total Timeline: 4-6 weeks from concept to development start" 
              />
            </div>
          </TabsContent>
          
          <TabsContent value="development" className="mt-8">
            <div className={`transition-all duration-500 ${
              isTransitioning ? "opacity-50 blur-sm" : "opacity-100 blur-0"
            }`}>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-semibold text-foreground mb-2">
                  Agile Development Process
                </h3>
                <p className="text-muted-foreground">
                  Continuous delivery and improvement through iterative development cycles
                </p>
              </div>
              <ProcessTimeline 
                steps={agileSteps} 
                totalDuration="Repeating 2-week cycles until project completion" 
              />
              <ContinuousImprovement />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Process;
