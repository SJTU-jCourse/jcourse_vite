import { Card } from "antd";
import { Helmet } from "react-helmet-async";

import CourseList from "@/components/course-list";
import PageHeader from "@/components/page-header";
import { usePagination } from "@/lib/hooks";
import { NotificationLevel } from "@/lib/models";
import { useFollowingCourseList } from "@/services/course";

const FollowCoursePage = () => {
  const { pagination, onPageChange } = usePagination();
  const { courses, loading } = useFollowingCourseList(
    NotificationLevel.FOLLOW,
    pagination
  );

  return (
    <>
      <PageHeader title="关注的课程"></PageHeader>
      <Helmet>
        <title>关注的课程 - SJTU选课社区</title>
      </Helmet>
      <Card title={`共有${courses ? courses.count : 0}门课`}>
        <CourseList
          loading={loading}
          count={courses?.count}
          courses={courses?.results}
          onPageChange={onPageChange}
          pagination={pagination}
        />
      </Card>
    </>
  );
};

export default FollowCoursePage;
