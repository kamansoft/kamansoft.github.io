import siteJson from '../data/site.json';

export type SectionKey = 'hero' | 'services' | 'approach' | 'process' | 'portfolio' | 'team' | 'blog' | 'contact' | 'footer';

export interface ISiteConfigAdapter { getData(): { sections: Record<string, boolean> }; }

export class SiteConfigJsonAdapter implements ISiteConfigAdapter {
  getData() { return siteJson; }
}

export class SiteConfigService {
  constructor(private adapter: ISiteConfigAdapter = new SiteConfigJsonAdapter()) {}
  isEnabled(key: SectionKey): boolean {
    return this.adapter.getData().sections[key] !== false;
  }
}

export const siteConfig = new SiteConfigService();
