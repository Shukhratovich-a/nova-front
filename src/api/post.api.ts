import queryString from "query-string";
import axios from "./axios";

import { IGetAll } from "@/types/response.interface";

import { IPost } from "@/types/post.interface";

export const getAll = (page?: number, limit?: number, language?: string) => {
  const query = queryString.stringifyUrl({ url: `/news/get-all`, query: { page, limit, language } });

  return axios.get<IGetAll<IPost[]>>(query);
};

export const getByAlias = async (alias: string, language?: string) => {
  const query = queryString.stringifyUrl({ url: `/news/get-by-alias/${alias}`, query: { language } });

  return axios.get<IPost>(query);
};
