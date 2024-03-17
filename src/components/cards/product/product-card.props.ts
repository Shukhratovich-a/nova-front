import { DetailedHTMLProps, HTMLAttributes } from "react";

import { ICatalog } from "@/types/catalog.interface";
import { ICertificate } from "@/types/certificate.interface";
import { IProduct } from "@/types/product.interface";
import { IVideo } from "@/types/video.interface";

export interface ProductCardProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  product: IProduct | ICertificate | ICatalog | IVideo;
  card: "product" | "certificate" | "catalog" | "video";
}
