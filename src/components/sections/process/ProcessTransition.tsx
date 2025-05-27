
import { RefreshCw } from "lucide-react";

interface ProcessTransitionProps {
  isTransitioning: boolean;
}

const ProcessTransition = ({ isTransitioning }: ProcessTransitionProps) => {
  if (!isTransitioning) return null;

  return (
    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 animate-pulse z-10 pointer-events-none">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-16 w-16 text-primary mx-auto mb-4 animate-spin" style={{animationDuration: '2s'}} />
          <p className="text-lg font-semibold text-primary animate-fade-in">
            Transitioning to Development Phase...
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProcessTransition;
