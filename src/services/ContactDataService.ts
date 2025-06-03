
import { IContactDataAdapter } from '../adapters/IDataAdapter';
import { ContactJsonAdapter } from '../adapters/JsonFileAdapter';

export interface ContactInfo {
  id: number;
  icon: string;
  title: string;
  details: string[];
  color: string;
}

export interface IContactDataProvider {
  getHeaderData(): Promise<{
    title: string;
    description: string;
  }>;
  getFormData(): Promise<{
    title: string;
    fields: Record<string, string>;
    submitButton: { text: string; icon: string };
  }>;
  getCallToAction(): Promise<{
    title: string;
    description: string;
    buttonText: string;
  }>;
  getContactInfo(): Promise<ContactInfo[]>;
}

export class ContactDataService implements IContactDataProvider {
  private adapter: IContactDataAdapter;

  constructor(adapter?: IContactDataAdapter) {
    this.adapter = adapter || new ContactJsonAdapter();
  }

  async getHeaderData() {
    const data = await this.adapter.getData();
    return data.header;
  }

  async getFormData() {
    const data = await this.adapter.getData();
    return data.form;
  }

  async getCallToAction() {
    const data = await this.adapter.getData();
    return data.callToAction;
  }

  async getContactInfo(): Promise<ContactInfo[]> {
    const data = await this.adapter.getData();
    return data.contactInfo;
  }
}
