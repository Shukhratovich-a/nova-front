import { ISubcategory } from "./subcategory.interface";

export interface ICategory {
  id: number;
  poster: string;
  alias: string;
  title: string;

  subcategories?: ISubcategory[];
}
