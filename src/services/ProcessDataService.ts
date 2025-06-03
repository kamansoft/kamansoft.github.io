
import { IProcessDataProvider, ProcessTab, ProcessTabData, ProcessStep } from "../types/process";

// Following SRP - Single responsibility for data provision
// Following OCP - Easy to extend with new tabs without modifying existing code
export class ProcessDataService implements IProcessDataProvider {
  private readonly conceptSteps: ProcessStep[] = [
    {
      id: 1,
      title: "Client & Stakeholder Meetings",
      description: "Listen and understand requirements through focused sessions",
      details: "2-3 meetings of 30 minutes each to deeply understand your needs and challenges",
      icon: "Users",
      duration: "3-5 days",
      color: "text-blue-600"
    },
    {
      id: 2,
      title: "Brainstorm & Solution Design",
      description: "Collaborate with building team and clients to explore options",
      details: "One week of intensive brainstorming to find the best ways and different options to achieve your solution",
      icon: "Lightbulb",
      duration: "1 week",
      color: "text-purple-600"
    },
    {
      id: 3,
      title: "POC & Mockup Development",
      description: "Build proof of concept and visual mockups",
      details: "Develop working prototypes and detailed mockups to validate the solution approach",
      icon: "Code",
      duration: "15 days",
      color: "text-green-600"
    },
    {
      id: 4,
      title: "POC Demo & MVP Definition",
      description: "Present proof of concept and define minimum viable product",
      details: "Showcase the POC demo and collaboratively define the Minimum Viable Product (MVP) features",
      icon: "Presentation",
      duration: "2-3 days",
      color: "text-orange-600"
    },
    {
      id: 5,
      title: "MVP Estimation & Refinement",
      description: "Detailed development estimation and solution refinement",
      details: "Provide accurate development estimates and refine the solution based on feedback and requirements",
      icon: "Settings",
      duration: "3 days",
      color: "text-red-600"
    }
  ];

  private readonly agileSteps: ProcessStep[] = [
    {
      id: 1,
      title: "Sprint Planning",
      description: "Plan what features to build in the next 2 weeks",
      details: "Team meets to decide which features to work on next, breaking them into small tasks",
      icon: "GitBranch",
      duration: "1 day",
      color: "text-blue-600"
    },
    {
      id: 2,
      title: "Development Sprint",
      description: "Build the planned features with daily check-ins",
      details: "2-week focused development period with daily team meetings to track progress and solve problems",
      icon: "Code",
      duration: "2 weeks",
      color: "text-green-600"
    },
    {
      id: 3,
      title: "Testing & Review",
      description: "Test the new features and gather feedback",
      details: "Quality assurance testing and client review to ensure everything works as expected",
      icon: "TestTube",
      duration: "2-3 days",
      color: "text-purple-600"
    },
    {
      id: 4,
      title: "Release & Demo",
      description: "Deploy new features and show progress to stakeholders",
      details: "Release the working features to production and demonstrate progress to clients",
      icon: "Rocket",
      duration: "1 day",
      color: "text-orange-600"
    }
  ];

  getTabs(): ProcessTab[] {
    return [
      {
        id: "conceptualizing",
        label: "Conceptualizing",
        content: {
          title: "From Idea to MVP Definition",
          description: "Understanding your vision and creating a solid foundation for development",
          steps: this.conceptSteps,
          totalDuration: "Total Timeline: 4-6 weeks from concept to development start"
        }
      },
      {
        id: "development",
        label: "Development",
        content: {
          title: "Agile Development Process",
          description: "Continuous delivery and improvement through iterative development cycles",
          steps: this.agileSteps,
          totalDuration: "Repeating 2-week cycles until project completion",
          hasSpecialComponent: true
        }
      }
    ];
  }

  getTabData(tabId: string): ProcessTabData | undefined {
    const tab = this.getTabs().find(t => t.id === tabId);
    return tab?.content;
  }
}
