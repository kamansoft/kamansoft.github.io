
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProcessTabContent from "./ProcessTabContent";
import { ProcessTab, IProcessDataProvider } from "../../../types/process";

// Following DIP - Depends on abstraction
// Following SRP - Only handles tab rendering
interface ProcessTabsProps {
  tabs: ProcessTab[];
  activeTab: string;
  isFlashing: boolean;
  isTransitioning: boolean;
  dataProvider: IProcessDataProvider;
  onTabChange: (value: string) => void;
}

const ProcessTabs = ({ 
  tabs, 
  activeTab, 
  isFlashing, 
  isTransitioning, 
  dataProvider,
  onTabChange 
}: ProcessTabsProps) => {
  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8 relative z-30">
        {tabs.map(tab => (
          <ProcessTabTrigger 
            key={tab.id}
            tab={tab}
            isActive={activeTab === tab.id}
            isFlashing={isFlashing}
          />
        ))}
      </TabsList>
      
      {tabs.map(tab => (
        <TabsContent key={tab.id} value={tab.id} className="mt-8">
          <ProcessTabContent 
            tabData={tab.content}
            isTransitioning={isTransitioning} 
          />
        </TabsContent>
      ))}
    </Tabs>
  );
};

// Following SRP - Single responsibility for tab trigger
interface ProcessTabTriggerProps {
  tab: ProcessTab;
  isActive: boolean;
  isFlashing: boolean;
}

const ProcessTabTrigger = ({ tab, isActive, isFlashing }: ProcessTabTriggerProps) => {
  const getTabColors = (tabId: string) => {
    return tabId === "conceptualizing" 
      ? { baseColor: "bg-blue-100 text-blue-900", flashColor: "text-blue-600", gradient: "bg-gradient-to-r from-blue-500/20 to-purple-500/20" }
      : { baseColor: "bg-green-100 text-green-900", flashColor: "text-green-600", gradient: "bg-gradient-to-r from-green-500/20 to-emerald-500/20" };
  };

  const colors = getTabColors(tab.id);
  const flashClass = isFlashing ? `bg-white ${colors.flashColor} shadow-xl shadow-white/80 brightness-150` : '';
  const activeClass = isActive ? `${colors.baseColor} shadow-md ${flashClass}` : 'opacity-70';
  
  return (
    <TabsTrigger 
      value={tab.id}
      className={`relative overflow-hidden transition-all duration-300 ${activeClass}`}
    >
      <span className="relative z-10">{tab.label}</span>
      {isActive && (
        <div className={`absolute inset-0 ${colors.gradient} ${isFlashing ? 'bg-white/90' : ''}`}></div>
      )}
    </TabsTrigger>
  );
};

export default ProcessTabs;
