
export interface ServiceItem {
  id: number;
  icon: string;
  title: string;
  description: string;
  color: string;
}

export interface IServicesDataProvider {
  getServices(): ServiceItem[];
  getHeaderData(): {
    title: string;
    description: string;
  };
}

export class ServicesDataService implements IServicesDataProvider {
  private readonly services: ServiceItem[] = [
    {
      id: 1,
      icon: "Code",
      title: "Custom Software Development",
      description: "Enterprise-grade web and desktop applications built with modern technologies. Scalable solutions tailored to your business requirements with clean, maintainable code.",
      color: "text-blue-600"
    },
    {
      id: 2,
      icon: "Database",
      title: "ETL & Data Processing",
      description: "Extract, Transform, Load solutions for seamless data integration. Automated data pipelines, real-time processing, and enterprise data warehouse solutions.",
      color: "text-purple-600"
    },
    {
      id: 3,
      icon: "Workflow",
      title: "Business Process Automation",
      description: "Streamline operations with intelligent automation. Workflow optimization, RPA implementation, and custom automation tools to reduce manual tasks and increase efficiency.",
      color: "text-green-600"
    },
    {
      id: 4,
      icon: "Smartphone",
      title: "Mobile App Development",
      description: "Native and cross-platform mobile applications for iOS and Android. User-friendly interfaces with robust backend integration and offline capabilities.",
      color: "text-orange-600"
    },
    {
      id: 5,
      icon: "Cloud",
      title: "Cloud Migration & DevOps",
      description: "Seamless cloud migration strategies and CI/CD pipeline implementation. AWS, Azure, and GCP expertise with containerization and microservices architecture.",
      color: "text-cyan-600"
    },
    {
      id: 6,
      icon: "BarChart3",
      title: "Business Intelligence & Analytics",
      description: "Transform raw data into actionable insights. Custom dashboards, reporting systems, and predictive analytics to drive data-driven decision making.",
      color: "text-indigo-600"
    },
    {
      id: 7,
      icon: "Shield",
      title: "Enterprise Security Solutions",
      description: "Comprehensive cybersecurity services including security audits, penetration testing, and compliance implementation to protect your digital assets.",
      color: "text-red-600"
    },
    {
      id: 8,
      icon: "Cog",
      title: "System Integration",
      description: "Connect disparate systems and applications. API development, legacy system modernization, and third-party integrations for unified business operations.",
      color: "text-emerald-600"
    }
  ];

  getServices(): ServiceItem[] {
    return this.services;
  }

  getHeaderData() {
    return {
      title: "Enterprise Software Development & Automation Services",
      description: "Transform your business with our comprehensive software development, ETL data processing, and automation solutions. We help enterprises modernize operations, streamline workflows, and unlock the power of their data."
    };
  }
}
