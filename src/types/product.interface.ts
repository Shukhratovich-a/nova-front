export interface IProduct {
  id: number;
  code: string;
  title: string;
  description: string;
  mainImage: string;
  boxImage: string;
  schemeImage: string;

  detailCategories: IDetailCategory[];

  createAt: string;
  updateAt: string;
}

export interface IDetailCategory {
  id: number;
  title: string;
  details: IDetail[];
}

export interface IDetail {
  id: number;
  value: string;
  title?: string;
}
