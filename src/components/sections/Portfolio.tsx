
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from "lucide-react";
import { PortfolioDataService } from "../../services/PortfolioDataService";
import { useMemo, useEffect, useState } from "react";

const Portfolio = () => {
  const dataService = useMemo(() => new PortfolioDataService(), []);
  const [projects, setProjects] = useState([]);
  const [headerData, setHeaderData] = useState({ title: '', description: '' });

  useEffect(() => {
    const loadData = async () => {
      try {
        const [projectsData, headerInfo] = await Promise.all([
          dataService.getProjects(),
          dataService.getHeaderData()
        ]);
        setProjects(projectsData);
        setHeaderData(headerInfo);
      } catch (error) {
        console.error('Failed to load portfolio data:', error);
      }
    };
    
    loadData();
  }, [dataService]);

  return (
    <section id="portfolio" className="py-20 bg-secondary dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            {headerData.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
            {headerData.description}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <Card key={project.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-card border-border shadow-lg">
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
