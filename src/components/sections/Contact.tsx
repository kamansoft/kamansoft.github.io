
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Send
} from "lucide-react";
import { ContactDataService } from "../../services/ContactDataService";
import { useMemo, useEffect, useState } from "react";

const Contact = () => {
  const dataService = useMemo(() => new ContactDataService(), []);
  const [headerData, setHeaderData] = useState({ title: '', description: '' });
  const [formData, setFormData] = useState({ title: '', fields: {}, submitButton: { text: '', icon: '' } });
  const [callToAction, setCallToAction] = useState({ title: '', description: '', buttonText: '' });
  const [contactInfo, setContactInfo] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [headerInfo, formInfo, ctaInfo, contactInfoData] = await Promise.all([
          dataService.getHeaderData(),
          dataService.getFormData(),
          dataService.getCallToAction(),
          dataService.getContactInfo()
        ]);
        setHeaderData(headerInfo);
        setFormData(formInfo);
        setCallToAction(ctaInfo);
        setContactInfo(contactInfoData);
      } catch (error) {
        console.error('Failed to load contact data:', error);
      }
    };
    
    loadData();
  }, [dataService]);

  const iconMap = {
    Mail,
    Phone,
    MapPin,
    Clock,
    Send
  };

  const getIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName as keyof typeof iconMap];
    return IconComponent ? <IconComponent className="h-6 w-6" /> : null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted");
  };

  return (
    <section id="contact" className="py-20 bg-secondary dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            {headerData.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {headerData.description}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="bg-card shadow-xl border-border">
            <CardHeader>
              <CardTitle className="text-2xl text-foreground">
                {formData.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">{formData.fields.firstName}</Label>
                    <Input id="firstName" placeholder="John" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">{formData.fields.lastName}</Label>
                    <Input id="lastName" placeholder="Doe" required />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">{formData.fields.email}</Label>
                  <Input id="email" type="email" placeholder="john@example.com" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="company">{formData.fields.company}</Label>
                  <Input id="company" placeholder="Your Company" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">{formData.fields.subject}</Label>
                  <Input id="subject" placeholder="Project Discussion" required />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">{formData.fields.message}</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Tell us about your project..." 
                    className="min-h-[120px]"
                    required 
                  />
                </div>
                
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                  {getIcon(formData.submitButton.icon)}
                  {formData.submitButton.text}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">{callToAction.title}</h3>
              <p className="text-blue-100 mb-6">
                {callToAction.description}
              </p>
              <Button variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                {callToAction.buttonText}
              </Button>
            </div>

            <div className="grid gap-6">
              {contactInfo.map((info) => (
                <Card key={info.id} className="bg-card shadow-md border-border">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className={info.color}>
                          {getIcon(info.icon)}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-foreground mb-2">
                          {info.title}
                        </h4>
                        {info.details.map((detail, detailIndex) => (
                          <p key={detailIndex} className="text-muted-foreground">
                            {detail}
                          </p>
                        ))}
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

export default Contact;
