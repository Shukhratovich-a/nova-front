import queryString from "query-string";
import axios from "./axios";

import { IGetManyOptions } from "@/types/request.interface";
import { IGetAll } from "@/types/response.interface";
import { IBanner } from "@/types/banner.interface";
import { DOMAIN } from "@/helpers/api.helper";

export const getAll = async (options?: IGetManyOptions): Promise<IGetAll<IBanner[]>> => {
  const query = queryString.stringifyUrl({ url: `${DOMAIN}/banner/get-all`, query: { ...options } });

  return (await fetch(query)).json();
};
