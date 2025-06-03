
import ProcessTimeline from "./ProcessTimeline";
import ContinuousImprovement from "./ContinuousImprovement";
import { ProcessTabData } from "../../../types/process";

// Following SRP - Only responsible for tab content rendering
// Following ISP - Focused interface
interface ProcessTabContentProps {
  tabData: ProcessTabData;
  isTransitioning: boolean;
}

const ProcessTabContent = ({ tabData, isTransitioning }: ProcessTabContentProps) => {
  const transitionClass = isTransitioning ? "opacity-50 blur-sm" : "opacity-100 blur-0";

  return (
    <div className={`transition-all duration-500 ${transitionClass}`}>
      <TabHeader tabData={tabData} />
      <ProcessTimeline 
        steps={tabData.steps} 
        totalDuration={tabData.totalDuration} 
      />
      {tabData.hasSpecialComponent && <ContinuousImprovement />}
    </div>
  );
};

// Following SRP - Single responsibility for header
const TabHeader = ({ tabData }: { tabData: ProcessTabData }) => (
  <div className="text-center mb-8">
    <h3 className="text-2xl font-semibold text-foreground mb-2">
      {tabData.title}
    </h3>
    <p className="text-muted-foreground mb-4">
      {tabData.description}
    </p>
    {tabData.title.includes("MVP") && <MVPExplanation />}
  </div>
);

// Following SRP - Single responsibility for MVP explanation
const MVPExplanation = () => (
  <div className="max-w-2xl mx-auto bg-primary/10 border border-primary/20 rounded-lg p-4">
    <p className="text-sm text-muted-foreground">
      <strong className="text-foreground">MVP (Minimum Viable Product)</strong> is the simplest version of your product that includes only the core features needed to solve your main problem and deliver value to users.
    </p>
  </div>
);

export default ProcessTabContent;
