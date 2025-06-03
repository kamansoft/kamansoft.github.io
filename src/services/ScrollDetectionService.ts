
import { useState, useEffect } from "react";
import { IScrollDetector, ScrollBehavior } from "../types/process";

// Following SRP - Only handles scroll detection
// Following LSP - Can be substituted with any IScrollDetector implementation
export class ScrollDetectionService implements IScrollDetector {
  private scrollBehavior: ScrollBehavior = {
    isScrollingDown: false,
    lastScrollTop: 0
  };

  private listeners: ((behavior: ScrollBehavior) => void)[] = [];

  constructor() {
    this.initializeScrollListener();
  }

  private initializeScrollListener(): void {
    const handleScroll = () => {
      const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const isScrollingDown = currentScrollTop > this.scrollBehavior.lastScrollTop;
      
      this.scrollBehavior = {
        isScrollingDown,
        lastScrollTop: currentScrollTop
      };

      this.notifyListeners();
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.scrollBehavior));
  }

  getScrollBehavior(): ScrollBehavior {
    return { ...this.scrollBehavior };
  }

  subscribe(listener: (behavior: ScrollBehavior) => void): () => void {
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
export const useScrollDetection = (detector: IScrollDetector) => {
  const [scrollBehavior, setScrollBehavior] = useState<ScrollBehavior>(
    detector.getScrollBehavior()
  );

  useEffect(() => {
    if (detector instanceof ScrollDetectionService) {
      return detector.subscribe(setScrollBehavior);
    }
    return () => {};
  }, [detector]);

  return scrollBehavior;
};
