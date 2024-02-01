import { FC } from "react";
import { MapProps } from "./map.props";

export const Map: FC<MapProps> = ({ longitude, latitude }) => {
  const mapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d191885.59996935344!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8b0cc379e9c3%3A0xa5a9323b4aa5cb98!2z0KLQsNGI0LrQtdC90YIsINCj0LfQsdC10LrQuNGB0YLQsNC9!5e0!3m2!1sru!2s!4v1706173912685!5m2!1sru!2s`;

  return <iframe src={mapUrl} width="100%" height="100%" style={{ border: 0 }} loading="lazy" allowFullScreen></iframe>;
};
export default Map;