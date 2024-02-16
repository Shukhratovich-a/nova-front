export interface IPost {
  id: number;
  alias: string;
  poster: string;
  image: string;
  type: string;
  title: string;
  subtitle: string;
  body: string;
  tags: string[];
  createAt: string;
  updateAt: string;
}
