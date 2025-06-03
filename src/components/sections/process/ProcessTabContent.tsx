
import ProcessTimeline from "./ProcessTimeline";
import ContinuousImprovement from "./ContinuousImprovement";
import { conceptSteps, agileSteps } from "./ProcessSteps";

interface ProcessTabContentProps {
  activeTab: string;
  isTransitioning: boolean;
}

const ProcessTabContent = ({ activeTab, isTransitioning }: ProcessTabContentProps) => {
  const transitionClass = isTransitioning ? "opacity-50 blur-sm" : "opacity-100 blur-0";

  if (activeTab === "conceptualizing") {
    return (
      <div className={`transition-all duration-500 ${transitionClass}`}>
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
    );
  }

  return (
    <div className={`transition-all duration-500 ${transitionClass}`}>
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
  );
};

export default ProcessTabContent;
