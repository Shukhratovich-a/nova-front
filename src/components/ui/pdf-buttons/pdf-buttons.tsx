import { DOMAIN } from "@/helpers/api.helper";
import cn from "classnames";
import Link from "next/link";
import queryString from "query-string";
import { FC } from "react";
import Button from "../button/button";
import styles from "./pdf-buttons.module.scss";
import { PdfButtonsProps } from "./pdf-buttons.props";
import { useTranslation } from "next-i18next";

const PdfButtons: FC<PdfButtonsProps> = ({ name, type, className }) => {
  const { t } = useTranslation();
  // const [isPDFSupported, setIsPDFSupported] = useState(true);

  // useEffect(() => {
  //   setIsPDFSupported(getPdfSupported());
  // }, [isPDFSupported]);

  const urls = {
    product: {
      download: `${DOMAIN}/file/download-product-file/${name}`,
      preview: `${DOMAIN}/file/get-product-file/${name}`,
      button: "product-download",
    },
    catalog: {
      download: queryString.stringifyUrl({ url: `${DOMAIN}/file/download-file`, query: { file: name } }),
      preview: queryString.stringifyUrl({ url: `${DOMAIN}/file/get-file`, query: { file: name } }),
      button: "download",
    },
  };

  return (
    <div className={cn(className, styles.buttons)}>
      <Link href={urls[type].download}>
        <Button appearance="yellow">{t(urls[type].button)}</Button>
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
