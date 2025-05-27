
import { Card, CardContent } from "@/components/ui/card";
import { RefreshCw, ArrowDown } from "lucide-react";

const ContinuousImprovement = () => {
  return (
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
  );
};

export default ContinuousImprovement;
