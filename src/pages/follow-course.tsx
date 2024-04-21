import { Card } from "antd";
import { Helmet } from "react-helmet-async";
import { useSearchParams } from "react-router-dom";

import CourseList from "@/components/course-list";
import PageHeader from "@/components/page-header";
import Config from "@/lib/config";
import { NotificationLevel, Pagination } from "@/lib/models";
import { useFollowingCourseList } from "@/services/course";

const FollowCoursePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { page, size } = Object.fromEntries([...searchParams]);

  const pagination: Pagination = {
    page: page ? parseInt(page as string) : 1,
    pageSize: size ? parseInt(size as string) : Config.PAGE_SIZE,
  };

  const { courses, loading } = useFollowingCourseList(
    NotificationLevel.FOLLOW,
    pagination
  );

  const onPageChange = (page: number, pageSize: number) => {
    setSearchParams({ page: page.toString(), size: pageSize.toString() });
  };

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
