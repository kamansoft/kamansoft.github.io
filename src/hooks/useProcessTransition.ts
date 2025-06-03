
import { useEffect } from "react";
import { ITransitionController, TransitionContext } from "../types/process";

// Following DIP - Depends on abstraction, not concrete implementation
interface UseProcessTransitionProps {
  transitionController: ITransitionController;
  context: TransitionContext;
  onTransitionStart: () => void;
  onTransitionComplete: () => void;
}

export const useProcessTransition = ({
  transitionController,
  context,
  onTransitionStart,
  onTransitionComplete
}: UseProcessTransitionProps) => {
  useEffect(() => {
    const handleScroll = () => {
      if (transitionController.canTransition(context)) {
        onTransitionStart();
        transitionController.executeTransition(context);
        
        setTimeout(() => {
          onTransitionComplete();
        }, 500);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [transitionController, context, onTransitionStart, onTransitionComplete]);
};
