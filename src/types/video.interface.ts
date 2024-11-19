import { IProduct } from "./product.interface";

export interface IVideo {
  id: number;
  video: string;
  title: string;
  products?: IProduct[];

  createAt: string;
  updateAt: string;
}

export interface IInstalattionVideo {
  id: number;
  installation: string;
  title: string;
  products?: IProduct[];

  createAt: string;
  updateAt: string;
}
export interface IVideoCard {
  id: number;
  poster: string;
  title: string;
  code: string;
}
export interface IInstallationVideoCard {
  id: string;
  poster: string;
  title: string;
  code: string;
}

export interface IProductVideo {
  id: number;
  video: string;
  products: [
    {
      id: number;
      code: string;
      mainImage: string;
      boxImage: null | string;
      schemeImage: string;
      title: string;
      description: string;
      createAt: string;
      updateAt: string;
    }
  ];
  createAt: string;
  updateAt: string;
  title: string;
}
