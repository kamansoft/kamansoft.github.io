
import { useEffect } from "react";

interface UseAutoTransitionProps {
  activeTab: string;
  isNavigationTriggered: boolean;
  isTransitioning: boolean;
  isScrollingDown: boolean;
  sectionRef: React.RefObject<HTMLElement>;
  onTransitionStart: () => void;
  onTransitionComplete: () => void;
}

export const useAutoTransition = ({
  activeTab,
  isNavigationTriggered,
  isTransitioning,
  isScrollingDown,
  sectionRef,
  onTransitionStart,
  onTransitionComplete
}: UseAutoTransitionProps) => {
  useEffect(() => {
    const handleScroll = () => {
      if (isNavigationTriggered || isTransitioning || !sectionRef.current) return;
      
      if (!isScrollingDown) {
        return;
      }
      
      const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const sectionRect = sectionRef.current.getBoundingClientRect();
      const sectionTop = sectionRect.top + currentScrollTop;
      const sectionBottom = sectionTop + sectionRect.height;
      const viewportBottom = currentScrollTop + window.innerHeight;
      
      const isAtSectionBottom = viewportBottom >= sectionBottom - 50;
      const isInSection = currentScrollTop >= sectionTop - 100;
      
      console.log('Scroll check:', { 
        currentScrollTop,
        sectionTop,
        sectionBottom,
        viewportBottom,
        isAtSectionBottom,
        isInSection,
        isScrollingDown,
        activeTab,
        isNavigationTriggered 
      });
      
      if (activeTab === "conceptualizing" && isAtSectionBottom && isInSection && isScrollingDown) {
        console.log('Auto-transitioning from conceptualizing to development at process section bottom');
        onTransitionStart();
        
        if (sectionRef.current) {
          sectionRef.current.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start'
          });
        }
        
        setTimeout(() => {
          onTransitionComplete();
        }, 500);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeTab, isNavigationTriggered, isTransitioning, isScrollingDown, sectionRef, onTransitionStart, onTransitionComplete]);
};
