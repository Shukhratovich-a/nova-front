import { ICertificate } from "@/types/certificate.interface";
import { IVideo, IVideoCard } from "@/types/video.interface";
import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface MediaProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  video: IVideoCard[] | IVideo[];
  certificate: ICertificate[];
}
