import { useState, useRef, useMemo, useEffect } from "react";
import ProcessBackground from "./process/ProcessBackground";
import ProcessTransition from "./process/ProcessTransition";
import ProcessHeader from "./process/ProcessHeader";
import ProcessTabs from "./process/ProcessTabs";

// Services and hooks following DIP
import { ProcessDataService } from "../../services/ProcessDataService";
import { ScrollDetectionService, useScrollDetection } from "../../services/ScrollDetectionService";
import { NavigationDetectionService, useNavigationDetection } from "../../services/NavigationDetectionService";
import { TransitionControllerService } from "../../services/TransitionControllerService";
import { useProcessTransition } from "../../hooks/useProcessTransition";

const Process = () => {
  console.log("Process component rendering");
  
  const [activeTab, setActiveTab] = useState("conceptualizing");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);
  const [tabs, setTabs] = useState([]);
  const sectionRef = useRef<HTMLElement>(null);

  const dataProvider = useMemo(() => {
    console.log("Creating ProcessDataService");
    return new ProcessDataService();
  }, []);

  useEffect(() => {
    const loadTabs = async () => {
      try {
        const tabsData = await dataProvider.getTabs();
        setTabs(tabsData);
        console.log("Tabs data loaded:", tabsData);
      } catch (error) {
        console.error('Failed to load process data:', error);
      }
    };
    
    loadTabs();
  }, [dataProvider]);
  
  const scrollDetector = useMemo(() => {
    console.log("Creating ScrollDetectionService");
    return new ScrollDetectionService();
  }, []);
  
  const navigationDetector = useMemo(() => {
    console.log("Creating NavigationDetectionService");
    return new NavigationDetectionService();
  }, []);
  
  const transitionController = useMemo(() => {
    console.log("Creating TransitionControllerService");
    return new TransitionControllerService();
  }, []);

  // Using services through hooks
  const scrollBehavior = useScrollDetection(scrollDetector);
  const navigationState = useNavigationDetection(navigationDetector);

  const transitionContext = {
    activeTab,
    scrollBehavior,
    navigationState,
    transitionState: { isTransitioning, isFlashing },
    sectionRef
  };

  const handleTransitionStart = () => {
    console.log("Transition starting");
    setIsTransitioning(true);
  };

  const handleTransitionComplete = () => {
    console.log("Transition completing");
    setIsFlashing(true);
    setActiveTab("development");
    
    setTimeout(() => {
      setIsFlashing(false);
    }, 50);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  };

  useProcessTransition({
    transitionController,
    context: transitionContext,
    onTransitionStart: handleTransitionStart,
    onTransitionComplete: handleTransitionComplete
  });

  const handleTabChange = (value: string) => {
    console.log("Tab changing to:", value);
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
          tabs={tabs}
          activeTab={activeTab}
          isFlashing={isFlashing}
          isTransitioning={isTransitioning}
          dataProvider={dataProvider}
          onTabChange={handleTabChange}
        />
      </div>
    </section>
  );
};

export default Process;
