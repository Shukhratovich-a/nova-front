import { useRouter } from "next/router";
import { FC } from "react";

const NewsItemPage: FC = () => {
  const router = useRouter();
  return <div>{router.query.id}</div>;
};

export default NewsItemPage;
