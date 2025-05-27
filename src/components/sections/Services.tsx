import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Code, 
  Smartphone, 
  Globe, 
  Database, 
  Cloud, 
  Shield,
  Palette,
  BarChart3,
  Workflow,
  Cog
} from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: <Code className="h-12 w-12 text-blue-600" />,
      title: "Custom Software Development",
      description: "Enterprise-grade web and desktop applications built with modern technologies. Scalable solutions tailored to your business requirements with clean, maintainable code."
    },
    {
      icon: <Database className="h-12 w-12 text-purple-600" />,
      title: "ETL & Data Processing",
      description: "Extract, Transform, Load solutions for seamless data integration. Automated data pipelines, real-time processing, and enterprise data warehouse solutions."
    },
    {
      icon: <Workflow className="h-12 w-12 text-green-600" />,
      title: "Business Process Automation", 
      description: "Streamline operations with intelligent automation. Workflow optimization, RPA implementation, and custom automation tools to reduce manual tasks and increase efficiency."
    },
    {
      icon: <Smartphone className="h-12 w-12 text-orange-600" />,
      title: "Mobile App Development",
      description: "Native and cross-platform mobile applications for iOS and Android. User-friendly interfaces with robust backend integration and offline capabilities."
    },
    {
      icon: <Cloud className="h-12 w-12 text-cyan-600" />,
      title: "Cloud Migration & DevOps",
      description: "Seamless cloud migration strategies and CI/CD pipeline implementation. AWS, Azure, and GCP expertise with containerization and microservices architecture."
    },
    {
      icon: <BarChart3 className="h-12 w-12 text-indigo-600" />,
      title: "Business Intelligence & Analytics",
      description: "Transform raw data into actionable insights. Custom dashboards, reporting systems, and predictive analytics to drive data-driven decision making."
    },
    {
      icon: <Shield className="h-12 w-12 text-red-600" />,
      title: "Enterprise Security Solutions",
      description: "Comprehensive cybersecurity services including security audits, penetration testing, and compliance implementation to protect your digital assets."
    },
    {
      icon: <Cog className="h-12 w-12 text-emerald-600" />,
      title: "System Integration",
      description: "Connect disparate systems and applications. API development, legacy system modernization, and third-party integrations for unified business operations."
    }
  ];

  return (
    <section id="services" className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Enterprise Software Development & Automation Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
            Transform your business with our comprehensive software development, ETL data processing, and automation solutions. 
            We help enterprises modernize operations, streamline workflows, and unlock the power of their data.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="h-full hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 bg-card border-border shadow-md"
            >
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  {service.icon}
                </div>
                <CardTitle className="text-xl font-semibold text-foreground">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground text-center">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
