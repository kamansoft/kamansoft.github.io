
import { IAboutDataAdapter } from '../adapters/IDataAdapter';
import { AboutJsonAdapter } from '../adapters/JsonFileAdapter';

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
  getFeatures(): Promise<AboutFeature[]>;
  getValues(): Promise<AboutValue[]>;
  getHeaderData(): Promise<{
    title: string;
    mainDescription: string;
    secondaryDescription: string;
  }>;
  getImageData(): Promise<{
    src: string;
    alt: string;
  }>;
}

export class AboutDataService implements IAboutDataProvider {
  private adapter: IAboutDataAdapter;

  constructor(adapter?: IAboutDataAdapter) {
    this.adapter = adapter || new AboutJsonAdapter();
  }

  async getFeatures(): Promise<AboutFeature[]> {
    const data = await this.adapter.getData();
    return data.features;
  }

  async getValues(): Promise<AboutValue[]> {
    const data = await this.adapter.getData();
    return data.values;
  }

  async getHeaderData() {
    const data = await this.adapter.getData();
    return data.header;
  }

  async getImageData() {
    const data = await this.adapter.getData();
    return data.image;
  }
}
