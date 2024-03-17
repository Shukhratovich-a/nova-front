import { ICertificate } from "@/types/certificate.interface";
import { IVideo } from "@/types/video.interface";
import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface MediaProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  video: IVideo[];
  certificate: ICertificate[];
}
