import { EditOutlined } from "@ant-design/icons";
import { Button, Card } from "antd";
import { Helmet } from "react-helmet-async";
import { Link, useSearchParams } from "react-router-dom";

import PageHeader from "@/components/page-header";
import ReviewList from "@/components/review-list";
import Config from "@/lib/config";
import { Pagination } from "@/lib/models";
import { useReviews } from "@/services/review";

const LatestReviewPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { page, size } = Object.fromEntries([...searchParams]);
  const pagination: Pagination = {
    page: page ? parseInt(page as string) : 1,
    pageSize: size ? parseInt(size as string) : Config.PAGE_SIZE,
  };

  const { reviews, loading } = useReviews(pagination);

  const onPageChange = (page: number, pageSize: number) => {
    setSearchParams({ page: page.toString(), size: pageSize.toString() });
  };
  return (
    <>
      <PageHeader
        title="最新点评"
        subTitle={`共有${reviews ? reviews.count : 0}个点评`}
        extra={
          <Link to="/write-review">
            <Button type="primary">
              <EditOutlined />
              新点评
            </Button>
          </Link>
        }
      />
      <Helmet>
        <title>最新点评 - SJTU选课社区</title>
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

export default LatestReviewPage;
