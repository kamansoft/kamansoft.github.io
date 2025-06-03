
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProcessStep } from "../../../types/process";
import { Users, Lightbulb, Code, Presentation, Settings, GitBranch, TestTube, Rocket } from "lucide-react";

// Icon mapping for converting string names to JSX components
const iconMap = {
  Users,
  Lightbulb,
  Code,
  Presentation,
  Settings,
  GitBranch,
  TestTube,
  Rocket
};

// Following SRP - Single responsibility for step rendering
interface ProcessStepsProps {
  steps: ProcessStep[];
  isTransitioning: boolean;
}

const ProcessSteps = ({ steps, isTransitioning }: ProcessStepsProps) => {
  const getIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName as keyof typeof iconMap];
    return IconComponent ? <IconComponent className="h-8 w-8" /> : null;
  };

  return (
    <div className={`grid gap-6 md:grid-cols-2 lg:grid-cols-3 transition-all duration-500 ${
      isTransitioning ? 'opacity-50 scale-95' : 'opacity-100 scale-100'
    }`}>
      {steps.map((step, index) => (
        <Card 
          key={step.id} 
          className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-card/80 backdrop-blur-sm border-border/50"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <div className={`${step.color} mr-4 flex-shrink-0`}>
                {getIcon(step.icon)}
              </div>
              <div className="flex-1">
                <Badge variant="outline" className="mb-2 text-xs">
                  {step.duration}
                </Badge>
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  {step.title}
                </h3>
              </div>
            </div>
            
            <p className="text-muted-foreground mb-3 text-sm leading-relaxed">
              {step.description}
            </p>
            
            <p className="text-xs text-muted-foreground/80 leading-relaxed">
              {step.details}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProcessSteps;
