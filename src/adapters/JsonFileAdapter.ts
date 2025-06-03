
import { IServicesDataAdapter, IAboutDataAdapter, ITeamDataAdapter, IProcessDataAdapter } from './IDataAdapter';

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
