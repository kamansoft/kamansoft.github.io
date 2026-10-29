import { IProcessDataAdapter } from '../adapters/IDataAdapter';
import { ProcessJsonAdapter } from '../adapters/JsonFileAdapter';

export interface ProcessHeader { eyebrow: string; title: string; description: string; }
export interface ProcessPhase { id: number; icon: string; title: string; description: string; duration: string; }

export interface IProcessDataProvider {
  getHeaderData(): Promise<ProcessHeader>;
  getPhases(): Promise<ProcessPhase[]>;
  getNote(): Promise<string>;
}

export class ProcessDataService implements IProcessDataProvider {
  private adapter: IProcessDataAdapter;
  constructor(adapter?: IProcessDataAdapter) { this.adapter = adapter || new ProcessJsonAdapter(); }
  async getHeaderData(): Promise<ProcessHeader> { return (await this.adapter.getData()).header; }
  async getPhases(): Promise<ProcessPhase[]> { return (await this.adapter.getData()).phases; }
  async getNote(): Promise<string> { return (await this.adapter.getData()).note; }
}
