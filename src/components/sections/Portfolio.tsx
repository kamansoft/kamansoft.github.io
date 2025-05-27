
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";

const Portfolio = () => {
  const projects = [
    {
      title: "Enterprise Data Warehouse & ETL Pipeline",
      description: "Complete data warehouse solution with automated ETL processes, handling 10TB+ daily data processing for a Fortune 500 retail company.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
      technologies: ["Apache Spark", "AWS Redshift", "Python", "Airflow"],
      category: "ETL & Data Processing"
    },
    {
      title: "Manufacturing Process Automation Suite",
      description: "Comprehensive automation platform that reduced manual processes by 85% and improved production efficiency for industrial manufacturing.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop",
      technologies: ["Python", "RPA", "IoT Integration", "PostgreSQL"],
      category: "Business Automation"
    },
    {
      title: "Healthcare Management System",
      description: "HIPAA-compliant healthcare platform with patient management, appointment scheduling, and integrated billing automation.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop",
      technologies: ["React", "Node.js", "FHIR API", "AWS"],
      category: "Enterprise Software"
    },
    {
      title: "Financial Services Data Integration",
      description: "Real-time data integration platform connecting multiple banking systems with automated compliance reporting and risk analysis.",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=400&fit=crop",
      technologies: ["Apache Kafka", "Spring Boot", "Oracle", "Kubernetes"],
      category: "ETL & Integration"
    },
    {
      title: "Supply Chain Optimization Platform",
      description: "AI-powered supply chain management system with predictive analytics, inventory automation, and vendor integration.",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=400&fit=crop",
      technologies: ["Python", "TensorFlow", "MongoDB", "Docker"],
      category: "Enterprise Software"
    },
    {
      title: "Document Processing Automation",
      description: "Intelligent document processing system using OCR and machine learning to automate invoice processing and data extraction.",
      image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&h=400&fit=crop",
      technologies: ["Python", "Tesseract OCR", "Azure AI", "Redis"],
      category: "Business Automation"
    }
  ];

  return (
    <section id="portfolio" className="py-20 bg-secondary dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Proven Success Stories
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
            Discover how we've helped enterprises transform their operations through custom software development, 
            ETL data processing, and intelligent automation solutions. Each project showcases our commitment to 
            delivering measurable business results.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-card border-border shadow-lg">
              <div className="relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="bg-background/90 text-foreground">
                    {project.category}
                  </Badge>
                </div>
              </div>
              
              <CardContent className="p-6 space-y-4">
                <h3 className="text-xl font-semibold text-foreground">
                  {project.title}
                </h3>
                
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <Badge key={techIndex} variant="outline" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex space-x-4 pt-4">
                  <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors">
                    <ExternalLink className="h-4 w-4" />
                    <span className="text-sm">Case Study</span>
                  </button>
                  <button className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors">
                    <Github className="h-4 w-4" />
                    <span className="text-sm">Learn More</span>
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
