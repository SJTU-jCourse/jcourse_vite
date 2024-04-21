import { useDebounceFn } from "ahooks";
import { Image } from "antd";
import { Link, Location, useLocation } from "react-router-dom";

import { Promotion } from "@/lib/models";
import { clickPromotion } from "@/services/promotion";

const convertImageSrc = (src: string | null) => {
  if (!src) return "";
  return src;
};

const convertJumpLink = (
  jump_link: string | null,
  location: Location
): string => {
  return jump_link || location.pathname;
};

const ImagePromotion = ({ promotion }: { promotion?: Promotion }) => {
  const location = useLocation();
  const { run: onClick } = useDebounceFn(
    () => {
      if (promotion) clickPromotion(promotion.id);
    },
    { wait: 5000 }
  );

  if (!promotion) return <></>;

  return (
    <Link
      to={convertJumpLink(promotion.jump_link, location)}
      target="_blank"
      onClick={onClick}
    >
      <Image
        src={convertImageSrc(promotion.image)}
        alt={promotion.text || ""}
        preview={false}
        width="100%"
      ></Image>
    </Link>
  );
};

export default ImagePromotion;
