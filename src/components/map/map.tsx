import { FC } from "react";
import { MapProps } from "./map.props";
import styles from "./map.module.scss";

export const Map: FC<MapProps> = ({ map }) => {
  return (
    <div
      className={styles.wrapper}
      dangerouslySetInnerHTML={{
        __html:
          map ||
          `
      <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d383770.5062663876!2d69.2793667!3d41.2825974!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b0cc379e9c3%3A0xa5a9323b4aa5cb98!2z0KLQsNGI0LrQtdC90YI!5e0!3m2!1sru!2s!4v1710429928902!5m2!1sru!2s" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`,
      }}
    ></div>
  );
};
export default Map;
