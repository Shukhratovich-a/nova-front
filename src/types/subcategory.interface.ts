import { ICategory } from "./category.interface";
import { IProduct } from "./product.interface";

export interface ISubcategory {
  id: number;
  poster: string;
  alias: string;
  title: string;

  category?: ICategory;

  products: IProduct[];
}
