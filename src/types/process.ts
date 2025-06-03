
// Core interfaces following ISP (Interface Segregation Principle)
export interface ProcessStep {
  id: number;
  title: string;
  description: string;
  details: string;
  icon: string; // Changed from React.ReactNode to string
  duration: string;
  color: string;
}

export interface ScrollBehavior {
  isScrollingDown: boolean;
  lastScrollTop: number;
}

export interface NavigationState {
  isNavigationTriggered: boolean;
}

export interface TransitionState {
  isTransitioning: boolean;
  isFlashing: boolean;
}

export interface ProcessTab {
  id: string;
  label: string;
  content: ProcessTabData;
}

export interface ProcessTabData {
  title: string;
  description: string;
  steps: ProcessStep[];
  totalDuration: string;
  hasSpecialComponent?: boolean;
}

// Abstractions for DIP (Dependency Inversion Principle)
export interface IScrollDetector {
  getScrollBehavior(): ScrollBehavior;
}

export interface INavigationDetector {
  getNavigationState(): NavigationState;
}

export interface ITransitionController {
  canTransition(context: TransitionContext): boolean;
  executeTransition(context: TransitionContext): void;
}

export interface TransitionContext {
  activeTab: string;
  scrollBehavior: ScrollBehavior;
  navigationState: NavigationState;
  transitionState: TransitionState;
  sectionRef: React.RefObject<HTMLElement>;
}

export interface IProcessDataProvider {
  getTabs(): Promise<ProcessTab[]>;
  getTabData(tabId: string): Promise<ProcessTabData | undefined>;
}
