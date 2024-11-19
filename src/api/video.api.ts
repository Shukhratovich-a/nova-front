import queryString from "query-string";
import axios from "./axios";

import { IGetManyOptions, IGetOneOptions } from "@/types/request.interface";
import { IInstalattionVideo, IProductVideo, IVideo } from "@/types/video.interface";

const getYoutubePoster = (url: string) => {
  // Проверяем, является ли URL корректным URL YouTube видео
  const youtubeUrlRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(youtubeUrlRegex);
  const videoId = match && match[4];

  return `https://img.youtube.com/vi_webp/${videoId}/hqdefault.webp`;
};

const getVideoCode = (products: ({ code: string } & Record<string, any>)[] | undefined) => {
  if (!products || !products?.length) return "";
  if (products?.length === 1) return products?.[0]?.code;
  return `${products?.[0]?.code} ${products?.[products.length - 1]?.code}`;
};

export const getAll = async (options?: IGetManyOptions) => {
  const query = queryString.stringifyUrl({ url: `/video/get-all`, query: { ...options } });

  return axios.get<IVideo[]>(query);
};

export const getAllInstallationVideo = async (options?: IGetManyOptions) => {
  const query = queryString.stringifyUrl({ url: `/installation/get-all`, query: { ...options } });

  return axios.get<IInstalattionVideo[]>(query);
};

export const getById = async (id: string, options?: IGetOneOptions) => {
  const query = queryString.stringifyUrl({ url: `/video/get-by-id/${id}`, query: { ...options } });

  return axios.get<IVideo>(query);
};
export const getByInstallationId = async (id: string, options?: IGetOneOptions) => {
  const query = queryString.stringifyUrl({ url: `/installation/get-by-id/${id}`, query: { ...options } });

  return axios.get<IVideo>(query);
};

export const getByProductId = async (id: string | number, options?: IGetOneOptions) => {
  const query = queryString.stringifyUrl({ url: `/video/get-by-product/${id}`, query: { ...options } });

  const { data } = await axios.get<IProductVideo[]>(query);
  const productVideoCards = data?.map(({ id, title, video, products }) => {
    const code = getVideoCode(products);
    const poster = getYoutubePoster(video);

    return { id, title, poster, code };
  });

  return productVideoCards;
};

export const getCards = async (options?: IGetManyOptions) => {
  const { data } = await getAll(options);
  const videoCards = data?.map(({ id, title, video, products }) => {
    const code = getVideoCode(products);
    const poster = getYoutubePoster(video);

    return { id, title, poster, code };
  });

  return videoCards;
};

export const getInstallationCards = async (options?: IGetManyOptions) => {
  const { data } = await getAllInstallationVideo(options);

  const videoCards = data?.map(({ id, title, installation, products }) => {
    const code = getVideoCode(products);
    const poster = getYoutubePoster(installation);

    return { id: `i${id}`, title, poster, code };
  });

  return videoCards;
};
