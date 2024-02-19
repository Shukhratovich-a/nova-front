import { ICategory } from "./category.interface";

export interface ISubcategory {
  id: number;
  poster: string;
  alias: string;
  title: string;

  category?: ICategory;
}
