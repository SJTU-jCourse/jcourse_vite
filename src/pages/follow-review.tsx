import { Button, Card } from "antd";
import { Helmet } from "react-helmet-async";
import { useNavigate, useSearchParams } from "react-router-dom";

import PageHeader from "@/components/page-header";
import ReviewList from "@/components/review-list";
import Config from "@/lib/config";
import { Pagination } from "@/lib/models";
import { useFollowedReviews } from "@/services/review";

const FollowReviewPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { page, size } = Object.fromEntries([...searchParams]);

  const pagination: Pagination = {
    page: page ? parseInt(page as string) : 1,
    pageSize: size ? parseInt(size as string) : Config.PAGE_SIZE,
  };

  const { reviews, loading } = useFollowedReviews(pagination);

  const onPageChange = (page: number, pageSize: number) => {
    setSearchParams({ page: page.toString(), size: pageSize.toString() });
  };

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
