
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
import { ServicesDataService } from "../../services/ServicesDataService";
import { useMemo } from "react";

const Services = () => {
  const dataService = useMemo(() => new ServicesDataService(), []);
  const services = dataService.getServices();
  const headerData = dataService.getHeaderData();

  const iconMap = {
    Code,
    Database,
    Workflow,
    Smartphone,
    Cloud,
    BarChart3,
    Shield,
    Cog
  };

  const getIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName as keyof typeof iconMap];
    return IconComponent ? <IconComponent className="h-12 w-12" /> : null;
  };

  return (
    <section id="services" className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            {headerData.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-4xl mx-auto">
            {headerData.description}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <Card 
              key={service.id} 
              className="h-full hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 bg-card border-border shadow-md"
            >
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  <div className={service.color}>
                    {getIcon(service.icon)}
                  </div>
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
