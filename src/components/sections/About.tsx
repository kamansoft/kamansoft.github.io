
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Users, Award, Target } from "lucide-react";

const About = () => {
  const features = [
    "Agile Development Methodology",
    "24/7 Technical Support",
    "Quality Assurance Testing",
    "Scalable Architecture Design",
    "Cross-Platform Compatibility",
    "Security-First Approach"
  ];

  const values = [
    {
      icon: <Users className="h-8 w-8 text-blue-600" />,
      title: "Client-Focused",
      description: "We prioritize our clients' success and work closely with them throughout the development process."
    },
    {
      icon: <Award className="h-8 w-8 text-purple-600" />,
      title: "Excellence",
      description: "We maintain the highest standards in code quality, design, and project delivery."
    },
    {
      icon: <Target className="h-8 w-8 text-green-600" />,
      title: "Innovation",
      description: "We stay at the forefront of technology to deliver cutting-edge solutions."
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
                About Kamansoft
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Founded with a passion for technology and innovation, Kamansoft has been at the forefront of software development for over 5 years. We specialize in creating custom software solutions that help businesses streamline their operations and achieve their goals.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our team of experienced developers, designers, and project managers work collaboratively to deliver high-quality software that exceeds expectations and drives business growth.
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
              alt="Team working"
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
