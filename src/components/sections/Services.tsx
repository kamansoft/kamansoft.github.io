
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Code, 
  Smartphone, 
  Globe, 
  Database, 
  Cloud, 
  Shield,
  Palette,
  BarChart3
} from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: <Code className="h-12 w-12 text-blue-600" />,
      title: "Web Development",
      description: "Custom web applications built with modern frameworks like React, Vue, and Angular for optimal performance and user experience."
    },
    {
      icon: <Smartphone className="h-12 w-12 text-purple-600" />,
      title: "Mobile Development", 
      description: "Native and cross-platform mobile apps for iOS and Android using React Native, Flutter, and native technologies."
    },
    {
      icon: <Database className="h-12 w-12 text-green-600" />,
      title: "Backend Development",
      description: "Robust server-side solutions with Node.js, Python, PHP, and .NET to power your applications with secure APIs."
    },
    {
      icon: <Cloud className="h-12 w-12 text-orange-600" />,
      title: "Cloud Solutions",
      description: "Scalable cloud infrastructure and deployment on AWS, Azure, and Google Cloud Platform for maximum reliability."
    },
    {
      icon: <Palette className="h-12 w-12 text-pink-600" />,
      title: "UI/UX Design",
      description: "Beautiful, intuitive user interfaces and experiences that engage users and drive conversions."
    },
    {
      icon: <Shield className="h-12 w-12 text-red-600" />,
      title: "Cybersecurity",
      description: "Comprehensive security audits, penetration testing, and implementation of security best practices."
    },
    {
      icon: <BarChart3 className="h-12 w-12 text-indigo-600" />,
      title: "Data Analytics",
      description: "Business intelligence solutions and data visualization to help you make informed decisions."
    },
    {
      icon: <Globe className="h-12 w-12 text-teal-600" />,
      title: "Digital Transformation",
      description: "Complete digital transformation strategies to modernize your business processes and workflows."
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We offer a comprehensive range of software development services to help your business thrive in the digital age.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="h-full hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 bg-white border-0 shadow-md"
            >
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  {service.icon}
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-center">
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
