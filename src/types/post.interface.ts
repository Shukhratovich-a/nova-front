export interface IPost {
  id: number;
  alias: string;
  poster: string;
  image: string;
  type: "ver" | "hor" | "none";
  title: string;
  subtitle: string;
  body: string;
  tags: string[];
  createAt: Date;
  updateAt: Date;
}
