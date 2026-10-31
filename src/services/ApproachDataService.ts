import { IApproachDataAdapter } from '../adapters/IDataAdapter';
import { ApproachJsonAdapter } from '../adapters/JsonFileAdapter';

export interface ApproachHeader { eyebrow: string; title: string; description: string; }
export interface ComparisonSide { label: string; points: string[]; }
export interface ApproachComparison { them: ComparisonSide; us: ComparisonSide; }
export interface Pillar { id: number; step: string; icon: string; title: string; description: string; }
export interface Troop { icon: string; label: string; text: string; }

export interface IApproachDataProvider {
  getHeaderData(): Promise<ApproachHeader>;
  getComparison(): Promise<ApproachComparison>;
  getPillars(): Promise<Pillar[]>;
  getTroop(): Promise<Troop>;
}

export class ApproachDataService implements IApproachDataProvider {
  private adapter: IApproachDataAdapter;
  constructor(adapter?: IApproachDataAdapter) { this.adapter = adapter || new ApproachJsonAdapter(); }
  async getHeaderData(): Promise<ApproachHeader> { return (await this.adapter.getData()).header; }
  async getComparison(): Promise<ApproachComparison> { return (await this.adapter.getData()).comparison; }
  async getPillars(): Promise<Pillar[]> { return (await this.adapter.getData()).pillars; }
  async getTroop(): Promise<Troop> { return (await this.adapter.getData()).troop; }
}
