
import { RefreshCw } from "lucide-react";

interface ProcessTransitionProps {
  isTransitioning: boolean;
}

const ProcessTransition = ({ isTransitioning }: ProcessTransitionProps) => {
  if (!isTransitioning) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 animate-pulse z-50 pointer-events-none">
      <div className="absolute top-20 left-0 right-0 flex items-center justify-center">
        <div className="text-center bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-lg p-8 shadow-2xl border border-primary/20 max-w-md mx-4">
          <RefreshCw className="h-12 w-12 text-primary mx-auto mb-4 animate-spin" style={{animationDuration: '2s'}} />
          <p className="text-xl font-bold text-primary mb-2">
            Transitioning...
          </p>
          <p className="text-base text-muted-foreground">
            Moving to Development Phase
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProcessTransition;
