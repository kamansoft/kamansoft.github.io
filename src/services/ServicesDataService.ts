
import { IServicesDataAdapter } from '../adapters/IDataAdapter';
import { ServicesJsonAdapter } from '../adapters/JsonFileAdapter';

export interface ServiceItem {
  id: number;
  icon: string;
  title: string;
  description: string;
  color: string;
}

export interface IServicesDataProvider {
  getServices(): Promise<ServiceItem[]>;
  getHeaderData(): Promise<{
    title: string;
    description: string;
  }>;
}

export class ServicesDataService implements IServicesDataProvider {
  private adapter: IServicesDataAdapter;

  constructor(adapter?: IServicesDataAdapter) {
    this.adapter = adapter || new ServicesJsonAdapter();
  }

  async getServices(): Promise<ServiceItem[]> {
    const data = await this.adapter.getData();
    return data.services;
  }

  async getHeaderData() {
    const data = await this.adapter.getData();
    return data.header;
  }
}
