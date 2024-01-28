import Map from "@/components/map/map";
import cn from "classnames";
import Link from "next/link";
import { FC } from "react";
import styles from "./map-block.module.scss";
import { MapCardProps } from "./map-block.props";

const MapCard: FC<MapCardProps> = (props) => {
  const { orient, title, address, map, phone, mail, ...rest } = props;

  // Стиль ориентации блока
  const orientStyle = orient === "row" ? styles.cardOrientRow : styles.cardColumn;

  return (
    <div className={cn(styles.card, orientStyle)} {...rest}>
      <div className={styles.map}>
        <Map latitude={0} longitude={0} />
      </div>

      <div className={styles.content}>
        <h2 className="color-accent">Центральный офис</h2>
        <div className={styles.info}>
          <p className="text-lg fw-bold">Адрес :</p>
          <p className="text-lg">Istanbul Tower Kat:10 No:48 Uluyol Cad. Bayrampasa, Istanbul / Turkey</p>
          <p className="text-lg fw-bold">Телефон :</p>
          <Link href={`tel:${""}`} className="color-accent text-lg">
            +90 212 612 42 43
          </Link>
          <p className="text-lg fw-bold">Электронная почта :</p>
          <Link href={`mailto:${""}`} className="color-accent text-lg">
            info@novaplastik.com
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MapCard;
