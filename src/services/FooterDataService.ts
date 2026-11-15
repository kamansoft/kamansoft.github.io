
import { IFooterDataAdapter } from '../adapters/IDataAdapter';
import { FooterJsonAdapter } from '../adapters/JsonFileAdapter';

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface FooterLink {
  text: string;
  href: string;
}

export interface ContactInfo {
  icon: string;
  text: string;
  href?: string;
  color: string;
}

export interface IFooterDataProvider {
  getCompanyData(): Promise<{
    name: string;
    description: string;
    social: SocialLink[];
  }>;
  getSolutions(): Promise<{
    title: string;
    links: FooterLink[];
  }>;
  getIndustries(): Promise<{
    title: string;
    items: string[];
  }>;
  getContact(): Promise<{
    title: string;
    info: ContactInfo[];
  }>;
  getLegal(): Promise<{
    copyright: string;
    links: FooterLink[];
  }>;
}

export class FooterDataService implements IFooterDataProvider {
  private adapter: IFooterDataAdapter;

  constructor(adapter?: IFooterDataAdapter) {
    this.adapter = adapter || new FooterJsonAdapter();
  }

  async getCompanyData() {
    const data = await this.adapter.getData();
    return data.company;
  }

  async getSolutions() {
    const data = await this.adapter.getData();
    return data.solutions;
  }

  async getIndustries() {
    const data = await this.adapter.getData();
    return data.industries;
  }

  async getContact() {
    const data = await this.adapter.getData();
    return data.contact;
  }

  async getLegal() {
    const data = await this.adapter.getData();
    return data.legal;
  }
}
