import { List } from "antd";

import CourseItem from "@/components/course-item";
import { CourseListItem, Pagination } from "@/lib/models";

const CourseList = ({
  loading,
  count,
  courses,
  onPageChange,
  pagination,
  showEnroll,
}: {
  loading: boolean;
  count: number | undefined;
  courses: CourseListItem[] | undefined;
  onPageChange?: (page: number, pageSize: number) => void;
  pagination?: Pagination;
  showEnroll?: boolean;
}) => {
  return (
    <List
      loading={loading}
      itemLayout="horizontal"
      pagination={
        pagination
          ? {
              hideOnSinglePage: true,
              onChange: (page: number, pageSize: number) => {
                onPageChange?.(page, pageSize);
              },
              total: count,
              current: pagination.page,
              defaultCurrent: pagination.page,
              pageSize: pagination.pageSize,
            }
          : false
      }
      dataSource={courses}
      renderItem={(course) => (
        <CourseItem course={course} showEnroll={showEnroll}></CourseItem>
      )}
    />
  );
};
export default CourseList;
