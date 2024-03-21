import queryString from "query-string";
import axios from "./axios";

import { IGetManyOptions } from "@/types/request.interface";
import { IGetAll } from "@/types/response.interface";
import { IAbout } from "@/types/about.interface";

export const getAll = (options?: IGetManyOptions) => {
  const query = queryString.stringifyUrl({ url: `/about/get-all`, query: { ...options } });
  return axios.get<IGetAll<IAbout[]>>(query);
};
