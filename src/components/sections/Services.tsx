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
  Cog,
  Zap
} from "lucide-react";
import { ServicesDataService } from "../../services/ServicesDataService";
import { useMemo, useEffect, useState } from "react";

const Services = () => {
  const dataService = useMemo(() => new ServicesDataService(), []);
  const [services, setServices] = useState([]);
  const [headerData, setHeaderData] = useState<{ eyebrow?: string; title: string; description: string }>({ title: '', description: '' });

  useEffect(() => {
    const loadData = async () => {
      try {
        const [servicesData, headerInfo] = await Promise.all([
          dataService.getServices(),
          dataService.getHeaderData()
        ]);
        setServices(servicesData);
        setHeaderData(headerInfo);
      } catch (error) {
        console.error('Failed to load services data:', error);
      }
    };
    
    loadData();
  }, [dataService]);

  const iconMap = {
    Code,
    Database,
    Workflow,
    Smartphone,
    Cloud,
    BarChart3,
    Shield,
    Cog,
    Zap
  };

  const getIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName as keyof typeof iconMap];
    return IconComponent ? <IconComponent className="h-5 w-5" /> : null;
  };

  return (
    <section id="services" className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mb-14">
          <p className="eyebrow mb-4">{headerData.eyebrow}</p>
          <h2 className="text-3xl md:text-5xl font-bold mb-5">{headerData.title}</h2>
          <p className="text-lg">{headerData.description}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service) => (
            <div
              key={service.id}
              className="group rounded-lg border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary"
            >
              <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-md bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                {getIcon(service.icon)}
              </div>
              <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
              <p className="text-sm">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
