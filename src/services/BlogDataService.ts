
import { IBlogDataAdapter } from '../adapters/IDataAdapter';
import { BlogJsonAdapter } from '../adapters/JsonFileAdapter';

export interface BlogPost {
  id: number;
  title: string;
  description: string;
  date: string;
  author: string;
  readTime: string;
  category: string;
  content?: string;
}

export interface IBlogDataProvider {
  getPosts(): Promise<BlogPost[]>;
  getPost(id: number): Promise<BlogPost | undefined>;
}

export class BlogDataService implements IBlogDataProvider {
  private adapter: IBlogDataAdapter;

  constructor(adapter?: IBlogDataAdapter) {
    this.adapter = adapter || new BlogJsonAdapter();
  }

  async getPosts(): Promise<BlogPost[]> {
    const data = await this.adapter.getData();
    return data.posts;
  }

  async getPost(id: number): Promise<BlogPost | undefined> {
    const posts = await this.getPosts();
    return posts.find(post => post.id === id);
  }
}
