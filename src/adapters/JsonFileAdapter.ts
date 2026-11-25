import { loadLocalized } from '../i18n/loadData';

import { 
  IServicesDataAdapter, 
  IAboutDataAdapter, 
  ITeamDataAdapter, 
  IProcessDataAdapter,
  IHeroDataAdapter,
  IPortfolioDataAdapter,
  IContactDataAdapter,
  IFooterDataAdapter,
  IBlogDataAdapter,
  IApproachDataAdapter
} from './IDataAdapter';

// JSON file adapter implementations
export class ServicesJsonAdapter implements IServicesDataAdapter {
  async getData() {
    return loadLocalized('services');
  }
}

export class AboutJsonAdapter implements IAboutDataAdapter {
  async getData() {
    return loadLocalized('about');
  }
}

export class TeamJsonAdapter implements ITeamDataAdapter {
  async getData() {
    return loadLocalized('team');
  }
}

export class ProcessJsonAdapter implements IProcessDataAdapter {
  async getData() {
    return loadLocalized('process');
  }
}

export class HeroJsonAdapter implements IHeroDataAdapter {
  async getData() {
    return loadLocalized('hero');
  }
}

export class PortfolioJsonAdapter implements IPortfolioDataAdapter {
  async getData() {
    return loadLocalized('portfolio');
  }
}

export class ContactJsonAdapter implements IContactDataAdapter {
  async getData() {
    return loadLocalized('contact');
  }
}

export class FooterJsonAdapter implements IFooterDataAdapter {
  async getData() {
    return loadLocalized('footer');
  }
}

export class BlogJsonAdapter implements IBlogDataAdapter {
  async getData() {
    return loadLocalized('blog');
  }
}

export class ApproachJsonAdapter implements IApproachDataAdapter {
  async getData() {
    return loadLocalized('approach');
  }
}
