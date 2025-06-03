
export interface AboutFeature {
  id: number;
  text: string;
}

export interface AboutValue {
  id: number;
  icon: string;
  title: string;
  description: string;
}

export interface IAboutDataProvider {
  getFeatures(): AboutFeature[];
  getValues(): AboutValue[];
  getHeaderData(): {
    title: string;
    mainDescription: string;
    secondaryDescription: string;
  };
  getImageData(): {
    src: string;
    alt: string;
  };
}

export class AboutDataService implements IAboutDataProvider {
  private readonly features: AboutFeature[] = [
    { id: 1, text: "Agile Development" },
    { id: 2, text: "Enterprise Security" },
    { id: 3, text: "Scalable Architecture" },
    { id: 4, text: "24/7 Support" },
    { id: 5, text: "Data Migration" },
    { id: 6, text: "Process Automation" }
  ];

  private readonly values: AboutValue[] = [
    {
      id: 1,
      icon: "Users",
      title: "Enterprise-Focused",
      description: "We understand enterprise challenges and deliver solutions that scale with your business."
    },
    {
      id: 2,
      icon: "Award",
      title: "Technical Excellence",
      description: "Our team maintains the highest standards in software architecture and code quality."
    },
    {
      id: 3,
      icon: "Target",
      title: "Results-Driven",
      description: "We leverage cutting-edge technologies to deliver measurable business outcomes."
    }
  ];

  getFeatures(): AboutFeature[] {
    return this.features;
  }

  getValues(): AboutValue[] {
    return this.values;
  }

  getHeaderData() {
    return {
      title: "Your Partner in Digital Transformation",
      mainDescription: "Kamansoft specializes in enterprise applications, ETL data processing, and business automation. With 5+ years of experience, we help organizations modernize operations and unlock data potential.",
      secondaryDescription: "From legacy modernization to cloud migration and intelligent automation, we provide end-to-end solutions that transform how you do business."
    };
  }

  getImageData() {
    return {
      src: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop",
      alt: "Software development team working on enterprise solutions"
    };
  }
}
