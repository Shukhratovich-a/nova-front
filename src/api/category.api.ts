import queryString from "query-string";
import axios from "./axios";

import { IGetManyOptions, IGetOneOptions } from "@/types/request.interface";
import { IGetAll } from "@/types/response.interface";
import { ICategory } from "@/types/category.interface";
import { DOMAIN } from "@/helpers/api.helper";

export const getAll = async (options?: IGetManyOptions): Promise<IGetAll<ICategory[]>> => {
  const query = queryString.stringifyUrl({ url: `${DOMAIN}/category/get-all`, query: { ...options } });

  return (await fetch(query)).json();
};

export const getAllWithChildren = (options?: IGetManyOptions) => {
  const query = queryString.stringifyUrl({ url: `/category/get-all-with-children`, query: { ...options } });

  return axios.get<IGetAll<ICategory[]>>(query);
};

export const getByAlias = async (alias: string, options?: IGetOneOptions) => {
  const query = queryString.stringifyUrl({ url: `/category/get-by-alias/${alias}`, query: { ...options } });

  return axios.get<ICategory>(query);
};
