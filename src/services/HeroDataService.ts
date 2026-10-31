import { IHeroDataAdapter } from '../adapters/IDataAdapter';
import { HeroJsonAdapter } from '../adapters/JsonFileAdapter';

export interface TechStackItem { id: number; icon: string; label: string; }
export interface LoopItem { id: number; role: 'engineer' | 'agent'; text: string; }
export interface StatItem { id: number; value: string; label: string; }
export interface HeroHeader { eyebrow: string; title: string; highlightText: string; description: string; }
export interface HeroButtons { primary: { text: string; icon: string }; secondary: { text: string; icon: string }; }

export interface IHeroDataProvider {
  getHeaderData(): Promise<HeroHeader>;
  getButtons(): Promise<HeroButtons>;
  getTechStack(): Promise<TechStackItem[]>;
  getLoop(): Promise<LoopItem[]>;
  getStats(): Promise<StatItem[]>;
}

export class HeroDataService implements IHeroDataProvider {
  private adapter: IHeroDataAdapter;
  constructor(adapter?: IHeroDataAdapter) { this.adapter = adapter || new HeroJsonAdapter(); }
  async getHeaderData(): Promise<HeroHeader> { return (await this.adapter.getData()).header; }
  async getButtons(): Promise<HeroButtons> { return (await this.adapter.getData()).buttons; }
  async getTechStack(): Promise<TechStackItem[]> { return (await this.adapter.getData()).techStack; }
  async getLoop(): Promise<LoopItem[]> { return (await this.adapter.getData()).loop ?? []; }
  async getStats(): Promise<StatItem[]> { return (await this.adapter.getData()).stats ?? []; }
}
