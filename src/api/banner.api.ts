import queryString from "query-string";
import axios from "./axios";

import { IGetManyOptions } from "@/types/request.interface";
import { IGetAll } from "@/types/response.interface";
import { IBanner } from "@/types/banner.interface";

export const getAll = (options?: IGetManyOptions) => {
  const query = queryString.stringifyUrl({ url: `/banner/get-all`, query: { ...options } });

  return axios.get<IGetAll<IBanner[]>>(query);
};
