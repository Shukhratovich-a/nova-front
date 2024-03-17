import { IProduct } from "./product.interface";

export interface IVideo {
  id: number;
  video: string;
  title: string;
  products?: IProduct[];

  createAt: string;
  updateAt: string;
}