
import { 
  IServicesDataAdapter, 
  IAboutDataAdapter, 
  ITeamDataAdapter, 
  IProcessDataAdapter,
  IHeroDataAdapter,
  IPortfolioDataAdapter,
  IContactDataAdapter,
  IFooterDataAdapter,
  IBlogDataAdapter
} from './IDataAdapter';

// JSON file adapter implementations
export class ServicesJsonAdapter implements IServicesDataAdapter {
  async getData() {
    const response = await import('../data/services.json');
    return response.default;
  }
}

export class AboutJsonAdapter implements IAboutDataAdapter {
  async getData() {
    const response = await import('../data/about.json');
    return response.default;
  }
}

export class TeamJsonAdapter implements ITeamDataAdapter {
  async getData() {
    const response = await import('../data/team.json');
    return response.default;
  }
}

export class ProcessJsonAdapter implements IProcessDataAdapter {
  async getData() {
    const response = await import('../data/process.json');
    return response.default;
  }
}

export class HeroJsonAdapter implements IHeroDataAdapter {
  async getData() {
    const response = await import('../data/hero.json');
    return response.default;
  }
}

export class PortfolioJsonAdapter implements IPortfolioDataAdapter {
  async getData() {
    const response = await import('../data/portfolio.json');
    return response.default;
  }
}

export class ContactJsonAdapter implements IContactDataAdapter {
  async getData() {
    const response = await import('../data/contact.json');
    return response.default;
  }
}

export class FooterJsonAdapter implements IFooterDataAdapter {
  async getData() {
    const response = await import('../data/footer.json');
    return response.default;
  }
}

export class BlogJsonAdapter implements IBlogDataAdapter {
  async getData() {
    const response = await import('../data/blog.json');
    return response.default;
  }
}
