
import { ITeamDataAdapter } from '../adapters/IDataAdapter';
import { TeamJsonAdapter } from '../adapters/JsonFileAdapter';

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  skills: string[];
  bio: string;
  social: {
    linkedin: string;
    twitter: string;
    github: string;
  };
}

export interface ITeamDataProvider {
  getTeamMembers(): Promise<TeamMember[]>;
  getHeaderData(): Promise<{
    title: string;
    description: string;
  }>;
}

export class TeamDataService implements ITeamDataProvider {
  private adapter: ITeamDataAdapter;

  constructor(adapter?: ITeamDataAdapter) {
    this.adapter = adapter || new TeamJsonAdapter();
  }

  async getTeamMembers(): Promise<TeamMember[]> {
    const data = await this.adapter.getData();
    return data.teamMembers;
  }

  async getHeaderData() {
    const data = await this.adapter.getData();
    return data.header;
  }
}
