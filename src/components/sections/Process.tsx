import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Lightbulb, Code, Presentation, Settings, GitBranch, TestTube, Rocket, RefreshCw, ArrowDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const Process = () => {
  const [activeTab, setActiveTab] = useState("conceptualizing");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const conceptualizingContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !conceptualizingContentRef.current) return;
      
      const section = sectionRef.current;
      const conceptContent = conceptualizingContentRef.current;
      const sectionRect = section.getBoundingClientRect();
      const contentRect = conceptContent.getBoundingClientRect();
      
      // Check if we're in the process section and on conceptualizing tab
      if (activeTab === "conceptualizing" && sectionRect.top <= 100) {
        // Check if we've scrolled to the end of conceptualizing content
        if (contentRect.bottom <= window.innerHeight * 0.8) {
          // Start transition effect
          setIsTransitioning(true);
          
          // Scroll back to the top of the section more slowly
          section.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start'
          });
          
          // Switch to development tab after longer transition effect
          setTimeout(() => {
            setActiveTab("development");
            setTimeout(() => {
              setIsTransitioning(false);
            }, 1200);
          }, 2000);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeTab]);

  const conceptSteps = [
    {
      id: 1,
      title: "Client & Stakeholder Meetings",
      description: "Listen and understand requirements through focused sessions",
      details: "2-3 meetings of 30 minutes each to deeply understand your needs and challenges",
      icon: <Users className="h-8 w-8" />,
      duration: "3-5 days",
      color: "text-blue-600"
    },
    {
      id: 2,
      title: "Brainstorm & Solution Design",
      description: "Collaborate with building team and clients to explore options",
      details: "One week of intensive brainstorming to find the best ways and different options to achieve your solution",
      icon: <Lightbulb className="h-8 w-8" />,
      duration: "1 week",
      color: "text-purple-600"
    },
    {
      id: 3,
      title: "POC & Mockup Development",
      description: "Build proof of concept and visual mockups",
      details: "Develop working prototypes and detailed mockups to validate the solution approach",
      icon: <Code className="h-8 w-8" />,
      duration: "15 days",
      color: "text-green-600"
    },
    {
      id: 4,
      title: "POC Demo & MVP Definition",
      description: "Present proof of concept and define minimum viable product",
      details: "Showcase the POC demo and collaboratively define the Minimum Viable Product (MVP) features",
      icon: <Presentation className="h-8 w-8" />,
      duration: "2-3 days",
      color: "text-orange-600"
    },
    {
      id: 5,
      title: "MVP Estimation & Refinement",
      description: "Detailed development estimation and solution refinement",
      details: "Provide accurate development estimates and refine the solution based on feedback and requirements",
      icon: <Settings className="h-8 w-8" />,
      duration: "3 days",
      color: "text-red-600"
    }
  ];

  const agileSteps = [
    {
      id: 1,
      title: "Sprint Planning",
      description: "Plan what features to build in the next 2 weeks",
      details: "Team meets to decide which features to work on next, breaking them into small tasks",
      icon: <GitBranch className="h-8 w-8" />,
      duration: "1 day",
      color: "text-blue-600"
    },
    {
      id: 2,
      title: "Development Sprint",
      description: "Build the planned features with daily check-ins",
      details: "2-week focused development period with daily team meetings to track progress and solve problems",
      icon: <Code className="h-8 w-8" />,
      duration: "2 weeks",
      color: "text-green-600"
    },
    {
      id: 3,
      title: "Testing & Review",
      description: "Test the new features and gather feedback",
      details: "Quality assurance testing and client review to ensure everything works as expected",
      icon: <TestTube className="h-8 w-8" />,
      duration: "2-3 days",
      color: "text-purple-600"
    },
    {
      id: 4,
      title: "Release & Demo",
      description: "Deploy new features and show progress to stakeholders",
      details: "Release the working features to production and demonstrate progress to clients",
      icon: <Rocket className="h-8 w-8" />,
      duration: "1 day",
      color: "text-orange-600"
    }
  ];

  const renderTimeline = (steps: typeof conceptSteps, totalDuration: string) => (
    <div className="max-w-4xl mx-auto">
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-px bg-border hidden md:block"></div>
        
        {steps.map((step, index) => (
          <div 
            key={step.id} 
            className="relative flex items-start mb-12 group"
            style={{
              animation: `fade-in 0.6s ease-out ${index * 0.2}s both`
            }}
          >
            {/* Timeline dot */}
            <div className="hidden md:flex absolute left-6 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg z-10 group-hover:scale-125 transition-transform"></div>
            
            {/* Content */}
            <div className="md:ml-20 w-full">
              <Card className="hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 bg-card border-border">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className={`${step.color} p-2 bg-muted rounded-lg flex-shrink-0`}>
                      {step.icon}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-semibold text-foreground">
                          {step.id}. {step.title}
                        </h3>
                        <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                          {step.duration}
                        </span>
                      </div>
                      
                      <p className="text-muted-foreground mb-2">
                        {step.description}
                      </p>
                      
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {step.details}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <div className="inline-flex items-center space-x-2 text-sm text-muted-foreground bg-muted px-4 py-2 rounded-full">
          <span>{totalDuration}</span>
        </div>
      </div>
    </div>
  );

  return (
    <section 
      ref={sectionRef} 
      id="process" 
      className={`py-20 relative overflow-hidden transition-all duration-2000 ${
        activeTab === "conceptualizing" 
          ? "bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-muted/50" 
          : "bg-gradient-to-br from-green-50/50 via-blue-50/30 to-muted/50"
      }`}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Conceptualizing Background */}
        <div className={`absolute inset-0 transition-all duration-2000 ease-in-out ${
          activeTab === "conceptualizing" ? "opacity-100 scale-100" : "opacity-0 scale-110"
        }`}>
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-48 h-48 bg-purple-200/20 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-indigo-200/20 rounded-full blur-xl animate-pulse" style={{animationDelay: '2s'}}></div>
        </div>
        
        {/* Development Background */}
        <div className={`absolute inset-0 transition-all duration-2000 ease-in-out ${
          activeTab === "development" ? "opacity-100 scale-100" : "opacity-0 scale-90"
        }`}>
          <div className="absolute top-32 right-16 w-36 h-36 bg-green-200/20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-32 left-16 w-52 h-52 bg-emerald-200/20 rounded-full blur-2xl animate-pulse" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute top-60 left-1/3 w-44 h-44 bg-teal-200/20 rounded-full blur-xl animate-pulse" style={{animationDelay: '1.5s'}}></div>
        </div>
      </div>

      {/* Transition Overlay */}
      {isTransitioning && (
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 animate-pulse z-10 pointer-events-none">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <RefreshCw className="h-16 w-16 text-primary mx-auto mb-4 animate-spin" style={{animationDuration: '2s'}} />
              <p className="text-lg font-semibold text-primary animate-fade-in">
                Transitioning to Development Phase...
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 relative z-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Our Solution Building Process
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A proven methodology that ensures we understand your needs and deliver the right solution
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8 relative z-30">
            <TabsTrigger value="conceptualizing" className="relative overflow-hidden">
              <span className="relative z-10">Conceptualizing</span>
              {activeTab === "conceptualizing" && (
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 animate-pulse"></div>
              )}
            </TabsTrigger>
            <TabsTrigger value="development" className="relative overflow-hidden">
              <span className="relative z-10">Development</span>
              {activeTab === "development" && (
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 animate-pulse"></div>
              )}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="conceptualizing" className="mt-8">
            <div ref={conceptualizingContentRef} className={`transition-all duration-1000 ${
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
              {renderTimeline(conceptSteps, "Total Timeline: 4-6 weeks from concept to development start")}
            </div>
          </TabsContent>
          
          <TabsContent value="development" className="mt-8">
            <div className={`transition-all duration-1000 ${
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
              {renderTimeline(agileSteps, "Repeating 2-week cycles until project completion")}
              
              {/* Connection line from timeline to continuous improvement */}
              <div className="max-w-4xl mx-auto mt-8">
                <div className="flex flex-col items-center">
                  {/* Connecting arrow */}
                  <div className="flex flex-col items-center mb-6">
                    <ArrowDown className="h-8 w-8 text-primary animate-bounce" />
                    <div className="h-8 w-px bg-primary/50"></div>
                  </div>
                  
                  {/* Enhanced Continuous Improvement Card */}
                  <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-background border-primary/30 shadow-2xl transform hover:scale-105 transition-all duration-500 relative overflow-hidden">
                    {/* Background pattern */}
                    <div className="absolute inset-0 opacity-5">
                      <div className="absolute inset-0" style={{
                        backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, currentColor 10px, currentColor 11px)`,
                        color: 'hsl(var(--primary))'
                      }}></div>
                    </div>
                    
                    <CardContent className="p-8 text-center relative z-10">
                      <div className="flex items-center justify-center mb-6">
                        <div className="relative">
                          <RefreshCw className="h-16 w-16 text-primary" 
                            style={{
                              animation: 'spin 4s linear infinite',
                              filter: 'drop-shadow(0 0 20px hsl(var(--primary) / 0.3))'
                            }} 
                          />
                          <div className="absolute inset-0 bg-primary/20 rounded-full animate-pulse"></div>
                        </div>
                      </div>
                      
                      <h4 className="text-2xl font-bold text-foreground mb-4 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                        Continuous Improvement Cycle
                      </h4>
                      
                      <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                        Each sprint cycle allows us to adapt, improve, and deliver value incrementally. 
                        You see progress every 2 weeks and can provide feedback to guide the next iteration.
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                        <div className="flex flex-col items-center p-4 bg-background/50 rounded-lg">
                          <div className="w-3 h-3 bg-green-500 rounded-full mb-2 animate-pulse"></div>
                          <span className="text-sm font-medium text-foreground">Regular Demos</span>
                        </div>
                        <div className="flex flex-col items-center p-4 bg-background/50 rounded-lg">
                          <div className="w-3 h-3 bg-blue-500 rounded-full mb-2 animate-pulse" style={{animationDelay: '0.5s'}}></div>
                          <span className="text-sm font-medium text-foreground">Feedback Integration</span>
                        </div>
                        <div className="flex flex-col items-center p-4 bg-background/50 rounded-lg">
                          <div className="w-3 h-3 bg-purple-500 rounded-full mb-2 animate-pulse" style={{animationDelay: '1s'}}></div>
                          <span className="text-sm font-medium text-foreground">Rapid Adaptation</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Process;
