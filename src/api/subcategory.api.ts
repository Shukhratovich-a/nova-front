import queryString from "query-string";
import axios from "./axios";

import { IGetManyOptions, IGetOneOptions } from "@/types/request.interface";
import { IGetAll } from "@/types/response.interface";
import { ISubcategory } from "@/types/subcategory.interface";

export const getAll = (options?: IGetManyOptions) => {
  const query = queryString.stringifyUrl({ url: `/subcategory/get-all`, query: { ...options } });

  return axios.get<IGetAll<ISubcategory[]>>(query);
};

export const getByAlias = async (alias: string, options?: IGetOneOptions) => {
  const query = queryString.stringifyUrl({ url: `/subcategory/get-by-alias/${alias}`, query: { ...options } });

  return axios.get<ISubcategory>(query);
};
