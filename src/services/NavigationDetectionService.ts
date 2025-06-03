
import { useState, useEffect } from "react";
import { INavigationDetector, NavigationState } from "../types/process";

// Following SRP - Only handles navigation detection
export class NavigationDetectionService implements INavigationDetector {
  private navigationState: NavigationState = {
    isNavigationTriggered: false
  };

  private listeners: ((state: NavigationState) => void)[] = [];

  constructor() {
    this.initializeNavigationListener();
  }

  private initializeNavigationListener(): void {
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
        this.setNavigationTriggered(true);
        setTimeout(() => {
          this.setNavigationTriggered(false);
        }, 2000);
      }
    };

    document.addEventListener('click', handleNavigationClick, true);
  }

  private setNavigationTriggered(triggered: boolean): void {
    this.navigationState = { isNavigationTriggered: triggered };
    this.notifyListeners();
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.navigationState));
  }

  getNavigationState(): NavigationState {
    return { ...this.navigationState };
  }

  subscribe(listener: (state: NavigationState) => void): () => void {
    this.listeners.push(listener);
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }
}

// Hook that uses the service (following DIP)
export const useNavigationDetection = (detector: INavigationDetector) => {
  const [navigationState, setNavigationState] = useState<NavigationState>(
    detector.getNavigationState()
  );

  useEffect(() => {
    if (detector instanceof NavigationDetectionService) {
      return detector.subscribe(setNavigationState);
    }
    return () => {};
  }, [detector]);

  return navigationState;
};
