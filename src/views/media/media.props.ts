import { MediaPageProps } from "@/pages/media";2
import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface MediaProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, MediaPageProps {}
