
import { useState, useRef } from "react";
import ProcessBackground from "./process/ProcessBackground";
import ProcessTransition from "./process/ProcessTransition";
import ProcessHeader from "./process/ProcessHeader";
import ProcessTabs from "./process/ProcessTabs";
import { useScrollDirection } from "../../hooks/useScrollDirection";
import { useNavigationDetection } from "../../hooks/useNavigationDetection";
import { useAutoTransition } from "../../hooks/useAutoTransition";

const Process = () => {
  const [activeTab, setActiveTab] = useState("conceptualizing");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const { isScrollingDown } = useScrollDirection();
  const isNavigationTriggered = useNavigationDetection();

  const handleTransitionStart = () => {
    setIsTransitioning(true);
  };

  const handleTransitionComplete = () => {
    setIsFlashing(true);
    setActiveTab("development");
    
    setTimeout(() => {
      setIsFlashing(false);
    }, 50);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  };

  useAutoTransition({
    activeTab,
    isNavigationTriggered,
    isTransitioning,
    isScrollingDown,
    sectionRef,
    onTransitionStart: handleTransitionStart,
    onTransitionComplete: handleTransitionComplete
  });

  const handleTabChange = (value: string) => {
    setIsFlashing(true);
    setActiveTab(value);
    
    setTimeout(() => {
      setIsFlashing(false);
    }, 50);
  };

  const getSectionBackgroundClass = () => {
    const baseClass = "py-20 relative overflow-hidden transition-all duration-1000";
    const backgroundClass = activeTab === "conceptualizing" 
      ? "bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-muted/50" 
      : "bg-gradient-to-br from-green-50/50 via-blue-50/30 to-muted/50";
    
    return `${baseClass} ${backgroundClass}`;
  };

  return (
    <section ref={sectionRef} id="process" className={getSectionBackgroundClass()}>
      <ProcessBackground activeTab={activeTab} />
      <ProcessTransition isTransitioning={isTransitioning} />

      <div className="container mx-auto px-4 relative z-20">
        <ProcessHeader 
          title="Our Solution Building Process"
          description="A proven methodology that ensures we understand your needs and deliver the right solution"
        />

        <ProcessTabs 
          activeTab={activeTab}
          isFlashing={isFlashing}
          isTransitioning={isTransitioning}
          onTabChange={handleTabChange}
        />
      </div>
    </section>
  );
};

export default Process;
