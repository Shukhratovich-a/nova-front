import { DetailedHTMLProps, HTMLAttributes } from "react";

import { ICatalog } from "@/types/catalog.interface";
import { ICertificate } from "@/types/certificate.interface";
import { IProduct } from "@/types/product.interface";
import { IInstallationVideoCard, IVideoCard } from "@/types/video.interface";

export interface ProductCardProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  product: IProduct | ICertificate | ICatalog | IVideoCard | IInstallationVideoCard;
  card: "product" | "certificate" | "catalog" | "video";
}
