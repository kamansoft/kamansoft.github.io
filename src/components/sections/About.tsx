
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Users, Award, Target } from "lucide-react";

const About = () => {
  const features = [
    "Agile Development",
    "Enterprise Security",
    "Scalable Architecture", 
    "24/7 Support",
    "Data Migration",
    "Process Automation"
  ];

  const values = [
    {
      icon: <Users className="h-6 w-6 text-blue-600" />,
      title: "Enterprise-Focused",
      description: "We understand enterprise challenges and deliver solutions that scale with your business."
    },
    {
      icon: <Award className="h-6 w-6 text-purple-600" />,
      title: "Technical Excellence", 
      description: "Our team maintains the highest standards in software architecture and code quality."
    },
    {
      icon: <Target className="h-6 w-6 text-green-600" />,
      title: "Results-Driven",
      description: "We leverage cutting-edge technologies to deliver measurable business outcomes."
    }
  ];

  return (
    <section id="about" className="py-24 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left Content */}
          <div className="space-y-10">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
                Your Partner in Digital Transformation
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Kamansoft specializes in enterprise applications, ETL data processing, and business automation. 
                With 5+ years of experience, we help organizations modernize operations and unlock data potential.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                From legacy modernization to cloud migration and intelligent automation, 
                we provide end-to-end solutions that transform how you do business.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700 text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content */}
          <div className="space-y-8">
            <img 
              src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop" 
              alt="Software development team working on enterprise solutions"
              className="rounded-xl shadow-lg w-full"
            />

            <div className="space-y-6">
              {values.map((value, index) => (
                <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 mt-1">
                        {value.icon}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {value.title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed">
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
