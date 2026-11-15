import { IContactDataAdapter } from '../adapters/IDataAdapter';
import { ContactJsonAdapter } from '../adapters/JsonFileAdapter';

export interface ContactChannel { id: string; icon: string; title: string; label: string; href: string; }
export interface WhatsAppInfo { number: string; message: string; }

export const whatsappUrl = (w: WhatsAppInfo) =>
  `https://wa.me/${w.number}?text=${encodeURIComponent(w.message)}`;

export class ContactDataService {
  constructor(private adapter: IContactDataAdapter = new ContactJsonAdapter()) {}
  async getHeaderData(): Promise<{ title: string; description: string }> {
    return (await this.adapter.getData()).header;
  }
  async getWhatsApp(): Promise<WhatsAppInfo> {
    return (await this.adapter.getData()).whatsapp;
  }
  async getChannels(): Promise<ContactChannel[]> {
    const data = await this.adapter.getData();
    return data.channels.map((c: ContactChannel) =>
      c.href === 'whatsapp' ? { ...c, href: whatsappUrl(data.whatsapp) } : c);
  }
}
