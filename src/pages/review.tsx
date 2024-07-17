import { Skeleton } from "antd";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";

import Config from "@/lib/config";
import { useReviewLocationInCourse } from "@/services/review";

const ReviewLocationPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useReviewLocationInCourse(id as string);

  useEffect(() => {
    if (data)
      navigate(
        `/course/${data.course}?page=${
          Math.floor(data.location / Config.PAGE_SIZE) + 1
        }#review-${id}`,
        { replace: true }
      );
  }, [data]);

  return (
    <>
      <Helmet>
        <title>跳转中……</title>
      </Helmet>
      <Skeleton />
    </>
  );
};

export default ReviewLocationPage;
