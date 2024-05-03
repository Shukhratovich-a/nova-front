import queryString from "query-string";
import axios from "./axios";

import { IContact } from "@/types/contact.interface";
import { ContactTypeEnum } from "@/enums/contact-type.enum";

export const getByType = (type: ContactTypeEnum, language?: string) => {
  const query = queryString.stringifyUrl({ url: `/contact/get-by-type/${type}`, query: { language } });

  return axios.get<IContact[]>(query);
};
