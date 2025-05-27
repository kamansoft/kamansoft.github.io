
import { Users, Lightbulb, Code, Presentation, Settings, GitBranch, TestTube, Rocket } from "lucide-react";

export interface ProcessStep {
  id: number;
  title: string;
  description: string;
  details: string;
  icon: React.ReactNode;
  duration: string;
  color: string;
}

export const conceptSteps: ProcessStep[] = [
  {
    id: 1,
    title: "Client & Stakeholder Meetings",
    description: "Listen and understand requirements through focused sessions",
    details: "2-3 meetings of 30 minutes each to deeply understand your needs and challenges",
    icon: <Users className="h-8 w-8" />,
    duration: "3-5 days",
    color: "text-blue-600"
  },
  {
    id: 2,
    title: "Brainstorm & Solution Design",
    description: "Collaborate with building team and clients to explore options",
    details: "One week of intensive brainstorming to find the best ways and different options to achieve your solution",
    icon: <Lightbulb className="h-8 w-8" />,
    duration: "1 week",
    color: "text-purple-600"
  },
  {
    id: 3,
    title: "POC & Mockup Development",
    description: "Build proof of concept and visual mockups",
    details: "Develop working prototypes and detailed mockups to validate the solution approach",
    icon: <Code className="h-8 w-8" />,
    duration: "15 days",
    color: "text-green-600"
  },
  {
    id: 4,
    title: "POC Demo & MVP Definition",
    description: "Present proof of concept and define minimum viable product",
    details: "Showcase the POC demo and collaboratively define the Minimum Viable Product (MVP) features",
    icon: <Presentation className="h-8 w-8" />,
    duration: "2-3 days",
    color: "text-orange-600"
  },
  {
    id: 5,
    title: "MVP Estimation & Refinement",
    description: "Detailed development estimation and solution refinement",
    details: "Provide accurate development estimates and refine the solution based on feedback and requirements",
    icon: <Settings className="h-8 w-8" />,
    duration: "3 days",
    color: "text-red-600"
  }
];

export const agileSteps: ProcessStep[] = [
  {
    id: 1,
    title: "Sprint Planning",
    description: "Plan what features to build in the next 2 weeks",
    details: "Team meets to decide which features to work on next, breaking them into small tasks",
    icon: <GitBranch className="h-8 w-8" />,
    duration: "1 day",
    color: "text-blue-600"
  },
  {
    id: 2,
    title: "Development Sprint",
    description: "Build the planned features with daily check-ins",
    details: "2-week focused development period with daily team meetings to track progress and solve problems",
    icon: <Code className="h-8 w-8" />,
    duration: "2 weeks",
    color: "text-green-600"
  },
  {
    id: 3,
    title: "Testing & Review",
    description: "Test the new features and gather feedback",
    details: "Quality assurance testing and client review to ensure everything works as expected",
    icon: <TestTube className="h-8 w-8" />,
    duration: "2-3 days",
    color: "text-purple-600"
  },
  {
    id: 4,
    title: "Release & Demo",
    description: "Deploy new features and show progress to stakeholders",
    details: "Release the working features to production and demonstrate progress to clients",
    icon: <Rocket className="h-8 w-8" />,
    duration: "1 day",
    color: "text-orange-600"
  }
];
