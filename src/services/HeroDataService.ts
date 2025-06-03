
import { IHeroDataAdapter } from '../adapters/IDataAdapter';
import { HeroJsonAdapter } from '../adapters/JsonFileAdapter';

export interface TechStackItem {
  id: number;
  icon: string;
  label: string;
}

export interface IHeroDataProvider {
  getHeaderData(): Promise<{
    title: string;
    highlightText: string;
    description: string;
  }>;
  getButtons(): Promise<{
    primary: { text: string; icon: string };
    secondary: { text: string; icon: string };
  }>;
  getTechStack(): Promise<TechStackItem[]>;
}

export class HeroDataService implements IHeroDataProvider {
  private adapter: IHeroDataAdapter;

  constructor(adapter?: IHeroDataAdapter) {
    this.adapter = adapter || new HeroJsonAdapter();
  }

  async getHeaderData() {
    const data = await this.adapter.getData();
    return data.header;
  }

  async getButtons() {
    const data = await this.adapter.getData();
    return data.buttons;
  }

  async getTechStack(): Promise<TechStackItem[]> {
    const data = await this.adapter.getData();
    return data.techStack;
  }
}
