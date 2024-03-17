import { DetailedHTMLProps, HTMLAttributes } from "react";

import { HomePageProps } from "@/pages";

export interface HomeProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>, HomePageProps {}
