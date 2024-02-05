import { HTMLAttributes } from "react";

export interface ContactsMapProps extends HTMLAttributes<HTMLDivElement> {
  orient: "row" | "column";
  title: string;
  address: string;
  map: { latitude: number | string; longitude: number | string };
  phone: string | number;
  mail: string;
}
