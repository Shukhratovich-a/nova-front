import queryString from "query-string";
import axios from "./axios";

import { IGetManyOptions, IGetOneOptions } from "@/types/request.interface";
import { IGetAll } from "@/types/response.interface";
import { ICategory } from "@/types/category.interface";

export const getAll = (options?: IGetManyOptions) => {
  const query = queryString.stringifyUrl({ url: `/category/get-all`, query: { ...options } });

  return axios.get<IGetAll<ICategory[]>>(query);
};

export const getAllWithChildren = (options?: IGetManyOptions) => {
  const query = queryString.stringifyUrl({ url: `/category/get-all-with-children`, query: { ...options } });

  return axios.get<IGetAll<ICategory[]>>(query);
};

export const getByAlias = async (alias: string, options?: IGetOneOptions) => {
  const query = queryString.stringifyUrl({ url: `/category/get-by-alias/${alias}`, query: { ...options } });

  return axios.get<ICategory>(query);
};
