
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Users, Award, Target } from "lucide-react";

const About = () => {
  const features = [
    "Agile Development Methodology",
    "Enterprise-Grade Security Standards",
    "Scalable Architecture Design",
    "24/7 Technical Support & Maintenance",
    "Data Migration & ETL Expertise",
    "Business Process Automation"
  ];

  const values = [
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      title: "Enterprise-Focused",
      description: "We understand enterprise challenges and deliver solutions that scale with your business growth and operational demands."
    },
    {
      icon: <Award className="h-8 w-8 text-purple-600" />,
      title: "Technical Excellence",
      description: "Our team maintains the highest standards in software architecture, code quality, and industry best practices for mission-critical applications."
    },
    {
      icon: <Target className="h-8 w-8 text-green-600" />,
      title: "Results-Driven Innovation",
      description: "We leverage cutting-edge technologies and proven methodologies to deliver measurable business outcomes and competitive advantages."
    }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Your Trusted Partner in Digital Transformation
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Kamansoft is a leading software development company specializing in enterprise applications, ETL data processing, and business automation solutions. With over 5 years of proven experience, we help organizations modernize their operations and unlock the full potential of their data.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our expert team of developers, data engineers, and automation specialists work closely with businesses to deliver custom solutions that drive efficiency, reduce costs, and accelerate growth. From legacy system modernization to cloud migration and intelligent automation, we provide end-to-end technology services that transform how you do business.
              </p>
            </div>

            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content */}
          <div className="space-y-8">
            <img 
              src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop" 
              alt="Software development team working on enterprise solutions"
              className="rounded-2xl shadow-xl"
            />

            <div className="grid gap-6">
              {values.map((value, index) => (
                <Card key={index} className="border-0 shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        {value.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {value.title}
                        </h3>
                        <p className="text-gray-600">
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
