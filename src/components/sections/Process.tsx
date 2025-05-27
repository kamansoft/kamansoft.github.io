
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Lightbulb, Code, Presentation, Settings, GitBranch, TestTube, Rocket, RefreshCw } from "lucide-react";

const Process = () => {
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
      title: "POC Demo & MCV Definition",
      description: "Present proof of concept and define minimum viable product",
      details: "Showcase the POC demo and collaboratively define the Minimum Viable Core (MVC) features",
      icon: <Presentation className="h-8 w-8" />,
      duration: "2-3 days",
      color: "text-orange-600"
    },
    {
      id: 5,
      title: "MVC Estimation & Refinement",
      description: "Detailed development estimation and solution refinement",
      details: "Provide accurate development estimates and refine the solution based on feedback and requirements",
      icon: <Settings className="h-8 w-8" />,
      duration: "3-5 days",
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
    <section id="process" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Our Solution Building Process
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A proven methodology that ensures we understand your needs and deliver the right solution
          </p>
        </div>

        <Tabs defaultValue="conceptualizing" className="w-full">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8">
            <TabsTrigger value="conceptualizing">Conceptualizing</TabsTrigger>
            <TabsTrigger value="development">Development</TabsTrigger>
          </TabsList>
          
          <TabsContent value="conceptualizing" className="mt-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold text-foreground mb-2">
                From Idea to MVC
              </h3>
              <p className="text-muted-foreground">
                Understanding your vision and creating a solid foundation for development
              </p>
            </div>
            {renderTimeline(conceptSteps, "Total Timeline: 4-7 weeks from concept to development start")}
          </TabsContent>
          
          <TabsContent value="development" className="mt-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-semibold text-foreground mb-2">
                Agile Development Process
              </h3>
              <p className="text-muted-foreground">
                Continuous delivery and improvement through iterative development cycles
              </p>
            </div>
            {renderTimeline(agileSteps, "Repeating 2-week cycles until project completion")}
            
            <div className="max-w-4xl mx-auto mt-12">
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-6 text-center">
                  <div className="flex items-center justify-center mb-4">
                    <RefreshCw className="h-8 w-8 text-primary animate-spin" style={{animationDuration: '3s'}} />
                  </div>
                  <h4 className="text-lg font-semibold text-foreground mb-2">
                    Continuous Improvement
                  </h4>
                  <p className="text-muted-foreground">
                    Each sprint cycle allows us to adapt, improve, and deliver value incrementally. 
                    You see progress every 2 weeks and can provide feedback to guide the next iteration.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default Process;
