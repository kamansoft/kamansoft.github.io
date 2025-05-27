
import { Card, CardContent } from "@/components/ui/card";
import { ProcessStep } from "./ProcessSteps";

interface ProcessTimelineProps {
  steps: ProcessStep[];
  totalDuration: string;
}

const ProcessTimeline = ({ steps, totalDuration }: ProcessTimelineProps) => {
  return (
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
};

export default ProcessTimeline;
