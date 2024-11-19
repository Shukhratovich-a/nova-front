import { ProductCard, VideosList } from "@/components";
import cn from "classnames";
import { useTranslation } from "next-i18next";
import { FC } from "react";
import { SwiperSlide } from "swiper/react";
import styles from "./installation.module.scss";
import { InstallationProps } from "./installation.props";

export const InstallationView: FC<InstallationProps> = ({ video }) => {
  const { t } = useTranslation();

  return (
    // <div className="main-margin">
    //   {!!video?.length && (
    //     <section id="video" className={cn(styles["block-mb"], "container")}>
    //       <h2 className={cn(styles.title, "color-accent")}>{t("video")}</h2>

    //       {/* <Slider type={"dynamic"} quantity={4}> */}
    //       {video?.map((item) => {
    //         return (
    //           <SwiperSlide key={item?.id}>
    //             <ProductCard card="video" product={item} />
    //           </SwiperSlide>
    //         );
    //       })}
    //       {/* </Slider> */}
    //     </section>
    //   )}
    // </div>
    <div className="main-margin container">
      <VideosList videos={video} />
    </div>
  );
};

export default InstallationView;
