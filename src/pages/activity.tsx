import { Card } from "antd";
import { Helmet } from "react-helmet-async";

import PageHeader from "@/components/page-header";
import ReviewList from "@/components/review-list";
import { useMyReviews } from "@/services/review";

const ActivityPage = () => {
  const { reviews, loading } = useMyReviews();

  return (
    <>
      <PageHeader
        title="我的点评"
        subTitle={`共有${reviews ? reviews.length : 0}条点评`}
      />
      <Helmet>
        <title>我的点评 - SJTU选课社区</title>
      </Helmet>
      <Card>
        <ReviewList
          loading={loading}
          count={reviews?.length}
          reviews={reviews}
        />
      </Card>
    </>
  );
};

export default ActivityPage;
