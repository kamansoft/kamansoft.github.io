
import { IProcessDataProvider, ProcessTab, ProcessTabData, ProcessStep } from "../types/process";
import { IProcessDataAdapter } from '../adapters/IDataAdapter';
import { ProcessJsonAdapter } from '../adapters/JsonFileAdapter';

export class ProcessDataService implements IProcessDataProvider {
  private adapter: IProcessDataAdapter;

  constructor(adapter?: IProcessDataAdapter) {
    this.adapter = adapter || new ProcessJsonAdapter();
  }

  async getTabs(): Promise<ProcessTab[]> {
    const data = await this.adapter.getData();
    
    return [
      {
        id: "conceptualizing",
        label: "Conceptualizing",
        content: {
          title: "From Idea to MVP Definition",
          description: "Understanding your vision and creating a solid foundation for development",
          steps: data.conceptSteps,
          totalDuration: "Total Timeline: 4-6 weeks from concept to development start"
        }
      },
      {
        id: "development",
        label: "Development",
        content: {
          title: "Agile Development Process",
          description: "Continuous delivery and improvement through iterative development cycles",
          steps: data.agileSteps,
          totalDuration: "Repeating 2-week cycles until project completion",
          hasSpecialComponent: true
        }
      }
    ];
  }

  async getTabData(tabId: string): Promise<ProcessTabData | undefined> {
    const tabs = await this.getTabs();
    const tab = tabs.find(t => t.id === tabId);
    return tab?.content;
  }
}
