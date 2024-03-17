import queryString from "query-string";
import axios from "./axios";

import { IGetManyOptions, IGetOneOptions } from "@/types/request.interface";
import { IGetAll } from "@/types/response.interface";
import { IVideo } from "@/types/video.interface";

export const getAll = async (options?: IGetManyOptions) => {
  const query = queryString.stringifyUrl({ url: `/video/get-all`, query: { ...options } });

  return axios.get<IVideo[]>(query);
};

export const getById = async (id: string, options?: IGetOneOptions) => {
  const query = queryString.stringifyUrl({ url: `/video/get-by-id/${id}`, query: { ...options } });

  return axios.get<IVideo>(query);
};

export const getCard = async (options?: IGetManyOptions) => {
  const { data } = await getAll(options);
  console.log(data);
  return data;
};

getCard()