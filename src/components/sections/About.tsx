import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Users, Award, Target } from "lucide-react";
import { AboutDataService } from "../../services/AboutDataService";
import { useMemo, useEffect, useState } from "react";

const About = () => {
  const dataService = useMemo(() => new AboutDataService(), []);
  const [features, setFeatures] = useState([]);
  const [values, setValues] = useState([]);
  const [headerData, setHeaderData] = useState({ title: '', mainDescription: '', secondaryDescription: '' });
  const [imageData, setImageData] = useState({ src: '', alt: '' });

  useEffect(() => {
    const loadData = async () => {
      try {
        const [featuresData, valuesData, headerInfo, imageInfo] = await Promise.all([
          dataService.getFeatures(),
          dataService.getValues(),
          dataService.getHeaderData(),
          dataService.getImageData()
        ]);
        setFeatures(featuresData);
        setValues(valuesData);
        setHeaderData(headerInfo);
        setImageData(imageInfo);
      } catch (error) {
        console.error('Failed to load about data:', error);
      }
    };
    
    loadData();
  }, [dataService]);

  const iconMap = {
    Users,
    Award,
    Target
  };

  const getIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName as keyof typeof iconMap];
    return IconComponent ? <IconComponent className="h-6 w-6 text-primary" /> : null;
  };

  return (
    <section id="about" className="py-24 bg-background dark:bg-gray-900">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left Content */}
          <div className="space-y-10">
            <div>
              <h2 className="text-4xl font-bold text-foreground mb-6 leading-tight">
                {headerData.title}
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                {headerData.mainDescription}
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {headerData.secondaryDescription}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {features.map((feature) => (
                <div key={feature.id} className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                  <span className="text-foreground text-sm">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content */}
          <div className="space-y-8">
            <img 
              src={imageData.src} 
              alt={imageData.alt}
              className="rounded-xl shadow-lg w-full"
            />

            <div className="space-y-6">
              {values.map((value) => (
                <Card key={value.id} className="border-border bg-card hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 mt-1">
                        {getIcon(value.icon)}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          {value.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {value.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
