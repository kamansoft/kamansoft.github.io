
import { Separator } from "@/components/ui/separator";
import { 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram,
  Mail,
  Phone,
  MapPin
} from "lucide-react";
import { FooterDataService } from "../../services/FooterDataService";
import { useMemo, useEffect, useState } from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const dataService = useMemo(() => new FooterDataService(), []);
  const [companyData, setCompanyData] = useState({ name: '', description: '', social: [] });
  const [solutions, setSolutions] = useState({ title: '', links: [] });
  const [industries, setIndustries] = useState({ title: '', items: [] });
  const [contact, setContact] = useState({ title: '', info: [] });
  const [legal, setLegal] = useState({ copyright: '', links: [] });

  useEffect(() => {
    const loadData = async () => {
      try {
        const [companyInfo, solutionsData, industriesData, contactData, legalData] = await Promise.all([
          dataService.getCompanyData(),
          dataService.getSolutions(),
          dataService.getIndustries(),
          dataService.getContact(),
          dataService.getLegal()
        ]);
        setCompanyData(companyInfo);
        setSolutions(solutionsData);
        setIndustries(industriesData);
        setContact(contactData);
        setLegal(legalData);
      } catch (error) {
        console.error('Failed to load footer data:', error);
      }
    };
    
    loadData();
  }, [dataService]);

  const iconMap = {
    Facebook,
    Twitter,
    Linkedin,
    Instagram,
    Mail,
    Phone,
    MapPin
  };

  const getIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName as keyof typeof iconMap];
    return IconComponent ? <IconComponent className="h-5 w-5" /> : null;
  };

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-blue-400">{companyData.name}</h3>
            <p className="text-gray-300 dark:text-gray-400 leading-relaxed">
              {companyData.description}
            </p>
            <div className="flex space-x-4">
              {companyData.social.map((social, index) => (
                <a 
                  key={index}
                  href={social.url} 
                  className="text-gray-400 hover:text-blue-400 transition-colors" 
                  aria-label={social.name}
                >
                  {getIcon(social.icon)}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">{solutions.title}</h4>
            <ul className="space-y-2">
              {solutions.links.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-300 dark:text-gray-400 hover:text-white transition-colors">
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">{industries.title}</h4>
            <ul className="space-y-2">
              {industries.items.map((industry, index) => (
                <li key={index}>
                  <span className="text-gray-300 dark:text-gray-400">{industry}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">{contact.title}</h4>
            <div className="space-y-3">
              {contact.info.map((info, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className={info.color}>
                    {getIcon(info.icon)}
                  </div>
                  {info.href ? (
                    <a href={info.href} className="text-gray-300 dark:text-gray-400 hover:text-white transition-colors">
                      {info.text}
                    </a>
                  ) : (
                    <span className="text-gray-300 dark:text-gray-400">{info.text}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-gray-700 dark:bg-gray-600" />

        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-400 dark:text-gray-500 text-sm leading-relaxed">
            © {currentYear} {legal.copyright}
          </p>
          <div className="flex space-x-6 text-sm">
            {legal.links.map((link, index) => (
              <a key={index} href={link.href} className="text-gray-400 dark:text-gray-500 hover:text-white transition-colors">
                {link.text}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
