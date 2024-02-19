import queryString from "query-string";
import axios from "./axios";

import { IGetManyOptions, IGetOneOptions } from "@/types/request.interface";
import { IGetAll } from "@/types/response.interface";
import { IPost } from "@/types/post.interface";

export const getAll = (options?: IGetManyOptions) => {
  const query = queryString.stringifyUrl({ url: `/news/get-all`, query: { ...options } });

  return axios.get<IGetAll<IPost[]>>(query);
};

export const getByAlias = async (alias: string, options?: IGetOneOptions) => {
  const query = queryString.stringifyUrl({ url: `/news/get-by-alias/${alias}`, query: { ...options } });

  return axios.get<IPost>(query);
};

export const getByTags = async (tags: string[], options?: IGetManyOptions & { newsId?: number }) => {
  const query = queryString.stringifyUrl(
    { url: `/news/get-by-tags`, query: { tags, ...options } },
    { arrayFormat: "comma" }
  );

  return axios.get<IGetAll<IPost[]>>(query);
};
