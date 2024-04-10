import { DOMAIN } from "@/helpers/api.helper";
import cn from "classnames";
import Link from "next/link";
import queryString from "query-string";
import { FC } from "react";
import Button from "../button/button";
import styles from "./pdf-buttons.module.scss";
import { PdfButtonsProps } from "./pdf-buttons.props";

const PdfButtons: FC<PdfButtonsProps> = ({ name, type, className }) => {
  // const [isPDFSupported, setIsPDFSupported] = useState(true);

  // useEffect(() => {
  //   setIsPDFSupported(getPdfSupported());
  // }, [isPDFSupported]);

  const urls = {
    product: {
      download: `${DOMAIN}/file/download-product-file/${name}`,
      preview: `${DOMAIN}/file/get-product-file/${name}`,
    },
    catalog: {
      download: queryString.stringifyUrl({ url: `${DOMAIN}/file/download-file`, query: { file: name } }),
      preview: queryString.stringifyUrl({ url: `${DOMAIN}/file/get-file`, query: { file: name } }),
    },
  };

  return (
    <div className={cn(className, styles.buttons)}>
      <Link href={urls[type].download}>
        <Button appearance="yellow">Скачать</Button>
      </Link>

      {/* {isPDFSupported && (
        <Link href={urls[type].preview} target="_blank">
          <Button appearance="outlined">Смотреть</Button>
        </Link>
      )} */}
    </div>
  );
};

export default PdfButtons;
