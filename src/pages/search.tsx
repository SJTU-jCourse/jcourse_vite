import { Card, Input, InputRef, message } from "antd";
import { useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";

import CourseList from "@/components/course-list";
import PageHeader from "@/components/page-header";
import { usePagination } from "@/lib/hooks";
import { useSearchCourse } from "@/services/course";

const { Search } = Input;

const SearchPage = () => {
  const { pagination, onPageChange, params, setSearchParams } = usePagination();
  const { q } = params;
  const show_q = q ?? "";
  const inputRef = useRef<InputRef>(null);

  const { courses, loading, mutate } = useSearchCourse(q, pagination);

  useEffect(() => {
    inputRef.current?.focus({ cursor: "end" });
    if (show_q == "") return;
    mutate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSearch = (value: string) => {
    if (value.trim() == "") {
      message.info("请输入搜索内容");
      return;
    }
    setSearchParams({ q: value.trim() });
  };

  return (
    <>
      <PageHeader title="搜索" onBack={() => history.back()}></PageHeader>
      <Helmet>
        <title>{"搜索 " + show_q + " - SJTU选课社区"}</title>
      </Helmet>
      <Search
        size="large"
        defaultValue={show_q}
        placeholder="搜索课程名/课号/教师姓名/教师姓名拼音"
        onSearch={onSearch}
        ref={inputRef}
        className="search-input"
      />
      <Card title={`共有${courses ? courses.count : 0}门课`}>
        <CourseList
          loading={loading}
          pagination={pagination}
          count={courses?.count}
          courses={courses?.results}
          onPageChange={onPageChange}
          showEnroll={true}
        />
      </Card>
    </>
  );
};

export default SearchPage;
