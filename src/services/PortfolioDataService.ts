
import { IPortfolioDataAdapter } from '../adapters/IDataAdapter';
import { PortfolioJsonAdapter } from '../adapters/JsonFileAdapter';

export interface PortfolioProject {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: string;
}

export interface IPortfolioDataProvider {
  getHeaderData(): Promise<{
    title: string;
    description: string;
  }>;
  getProjects(): Promise<PortfolioProject[]>;
}

export class PortfolioDataService implements IPortfolioDataProvider {
  private adapter: IPortfolioDataAdapter;

  constructor(adapter?: IPortfolioDataAdapter) {
    this.adapter = adapter || new PortfolioJsonAdapter();
  }

  async getHeaderData() {
    const data = await this.adapter.getData();
    return data.header;
  }

  async getProjects(): Promise<PortfolioProject[]> {
    const data = await this.adapter.getData();
    return data.projects;
  }
}
