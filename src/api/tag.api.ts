import queryString from "query-string";
import axios from "./axios";

import { IGetOneOptions } from "@/types/request.interface";

export const getTags = async (tags: string[], options?: IGetOneOptions) => {
  const query = queryString.stringifyUrl(
    { url: `/tag/get-by-language`, query: { tags, ...options } },
    { arrayFormat: "comma" }
  );

  return axios.get<string[]>(query);
};
