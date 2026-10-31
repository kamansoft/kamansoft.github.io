import { IServicesDataAdapter } from '../adapters/IDataAdapter';
import { ServicesJsonAdapter } from '../adapters/JsonFileAdapter';

export interface ServiceItem { id: number; icon: string; title: string; description: string; color: string; }
export interface ServiceGroup { id: number; icon: string; title: string; tagline: string; items: string[]; }

export interface IServicesDataProvider {
  getServices(): Promise<ServiceItem[]>;
  getGroups(): Promise<ServiceGroup[]>;
  getHeaderData(): Promise<{ eyebrow?: string; title: string; description: string }>;
}

export class ServicesDataService implements IServicesDataProvider {
  private adapter: IServicesDataAdapter;
  constructor(adapter?: IServicesDataAdapter) { this.adapter = adapter || new ServicesJsonAdapter(); }
  async getServices(): Promise<ServiceItem[]> { return (await this.adapter.getData()).services ?? []; }
  async getGroups(): Promise<ServiceGroup[]> { return (await this.adapter.getData()).groups ?? []; }
  async getHeaderData() { return (await this.adapter.getData()).header; }
}
