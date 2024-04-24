import { ContactTypeEnum } from "@/enums/contact-type.enum";

export interface IContact {
  id: number;

  company?: string;

  address: string;

  phone: string;

  email: string;

  type: ContactTypeEnum;

  country: string;

  city?: string;

  map: string;

  createAt: string;

  updateAt: string;
}
