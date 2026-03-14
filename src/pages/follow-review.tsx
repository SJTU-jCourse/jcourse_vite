import { Button, Card } from "antd";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

import PageHeader from "@/components/page-header";
import ReviewList from "@/components/review-list";
import { usePagination } from "@/lib/hooks";
import { useFollowedReviews } from "@/services/review";

const FollowReviewPage = () => {
  const navigate = useNavigate();
  const { pagination, onPageChange } = usePagination();
  const { reviews, loading } = useFollowedReviews(pagination);

  return (
    <>
      <PageHeader
        title="关注课程的点评"
        subTitle={`共有${reviews ? reviews.count : 0}个点评`}
        extra={
          <Button
            type="link"
            onClick={() => {
              navigate("/follow-course");
            }}
          >
            关注的课程
          </Button>
        }
      ></PageHeader>
      <Helmet>
        <title>关注 - SJTU选课社区</title>
      </Helmet>
      <Card>
        <ReviewList
          loading={loading}
          count={reviews?.count}
          reviews={reviews?.results}
          onPageChange={onPageChange}
          pagination={pagination}
        />
      </Card>
    </>
  );
};

export default FollowReviewPage;
