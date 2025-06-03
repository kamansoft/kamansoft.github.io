
import { ITransitionController, TransitionContext } from "../types/process";

// Following SRP - Only handles transition logic
// Following OCP - Easy to extend with new transition rules
export class TransitionControllerService implements ITransitionController {
  canTransition(context: TransitionContext): boolean {
    const {
      activeTab,
      scrollBehavior,
      navigationState,
      transitionState,
      sectionRef
    } = context;

    // Early returns following guard clause pattern
    if (navigationState.isNavigationTriggered) return false;
    if (transitionState.isTransitioning) return false;
    if (!sectionRef.current) return false;
    if (!scrollBehavior.isScrollingDown) return false;
    if (activeTab !== "conceptualizing") return false;

    return this.isAtSectionBottom(sectionRef.current, scrollBehavior.lastScrollTop);
  }

  private isAtSectionBottom(sectionElement: HTMLElement, currentScrollTop: number): boolean {
    const sectionRect = sectionElement.getBoundingClientRect();
    const sectionTop = sectionRect.top + currentScrollTop;
    const sectionBottom = sectionTop + sectionRect.height;
    const viewportBottom = currentScrollTop + window.innerHeight;
    
    const isAtSectionBottom = viewportBottom >= sectionBottom - 50;
    const isInSection = currentScrollTop >= sectionTop - 100;
    
    return isAtSectionBottom && isInSection;
  }

  executeTransition(context: TransitionContext): void {
    console.log('Auto-transitioning from conceptualizing to development at process section bottom');
    
    if (context.sectionRef.current) {
      context.sectionRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start'
      });
    }
  }
}
