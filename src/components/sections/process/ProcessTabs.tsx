
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProcessTabContent from "./ProcessTabContent";

interface ProcessTabsProps {
  activeTab: string;
  isFlashing: boolean;
  isTransitioning: boolean;
  onTabChange: (value: string) => void;
}

const ProcessTabs = ({ activeTab, isFlashing, isTransitioning, onTabChange }: ProcessTabsProps) => {
  const getTabTriggerClass = (tab: string, baseColor: string, flashColor: string) => {
    const isActive = activeTab === tab;
    const flashClass = isFlashing ? `bg-white ${flashColor} shadow-xl shadow-white/80 brightness-150` : '';
    const activeClass = isActive ? `${baseColor} shadow-md ${flashClass}` : 'opacity-70';
    
    return `relative overflow-hidden transition-all duration-300 ${activeClass}`;
  };

  const getBackgroundClass = (tab: string, gradient: string) => {
    const isActive = activeTab === tab;
    const flashClass = isFlashing ? 'bg-white/90' : '';
    
    return `absolute inset-0 ${gradient} ${flashClass}`;
  };

  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
      <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8 relative z-30">
        <TabsTrigger 
          value="conceptualizing" 
          className={getTabTriggerClass("conceptualizing", "bg-blue-100 text-blue-900", "text-blue-600")}
        >
          <span className="relative z-10">Conceptualizing</span>
          {activeTab === "conceptualizing" && (
            <div className={getBackgroundClass("conceptualizing", "bg-gradient-to-r from-blue-500/20 to-purple-500/20")}></div>
          )}
        </TabsTrigger>
        
        <TabsTrigger 
          value="development" 
          className={getTabTriggerClass("development", "bg-green-100 text-green-900", "text-green-600")}
        >
          <span className="relative z-10">Development</span>
          {activeTab === "development" && (
            <div className={getBackgroundClass("development", "bg-gradient-to-r from-green-500/20 to-emerald-500/20")}></div>
          )}
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="conceptualizing" className="mt-8">
        <ProcessTabContent activeTab="conceptualizing" isTransitioning={isTransitioning} />
      </TabsContent>
      
      <TabsContent value="development" className="mt-8">
        <ProcessTabContent activeTab="development" isTransitioning={isTransitioning} />
      </TabsContent>
    </Tabs>
  );
};

export default ProcessTabs;
