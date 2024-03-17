import { ContactTypeEnum } from "@/enums/contact-type.enum";

export interface IContact {
  id: number;

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
