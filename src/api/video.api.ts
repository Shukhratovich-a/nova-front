import queryString from "query-string";
import axios from "./axios";

import { IGetManyOptions, IGetOneOptions } from "@/types/request.interface";
import { IVideo } from "@/types/video.interface";

export const getAll = async (options?: IGetManyOptions) => {
  const query = queryString.stringifyUrl({ url: `/video/get-all`, query: { ...options } });

  return axios.get<IVideo[]>(query);
};

export const getById = async (id: string, options?: IGetOneOptions) => {
  const query = queryString.stringifyUrl({ url: `/video/get-by-id/${id}`, query: { ...options } });

  return axios.get<IVideo>(query);
};

export const getCards = async (options?: IGetManyOptions) => {
  const getYoutubePoster = (url: string) => {
    if (!url) return "";

    const youtubeUrlRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(youtubeUrlRegex);
    const videoId = match && match[4];

    return `https://img.youtube.com/vi_webp/${videoId}/hqdefault.webp`;
  };

  const { data } = await getAll(options);
  const videoCards = data.map(({ id, title, video, products }) => {
    let code = "";

    if (products && !!products?.length) code = `${products[0].code} ${products[products.length - 1].code}`;

    return { id, title, poster: getYoutubePoster(video), code };
  });

  return videoCards;
};
