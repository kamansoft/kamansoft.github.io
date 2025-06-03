
import { useState, useEffect } from "react";

export const useNavigationDetection = () => {
  const [isNavigationTriggered, setIsNavigationTriggered] = useState(false);

  useEffect(() => {
    const handleNavigationClick = (event: Event) => {
      const target = event.target as HTMLElement;
      
      const isNavClick = target.closest('nav') || 
                        target.closest('[data-nav]') || 
                        target.closest('button[onclick*="scrollTo"]') ||
                        target.closest('a[href*="#"]') ||
                        target.hasAttribute('data-scroll-to') ||
                        target.closest('[data-scroll-to]');
      
      if (isNavClick) {
        console.log('Navigation click detected, preventing auto-transition');
        setIsNavigationTriggered(true);
        setTimeout(() => {
          setIsNavigationTriggered(false);
        }, 2000);
      }
    };

    document.addEventListener('click', handleNavigationClick, true);
    return () => document.removeEventListener('click', handleNavigationClick, true);
  }, []);

  return isNavigationTriggered;
};
