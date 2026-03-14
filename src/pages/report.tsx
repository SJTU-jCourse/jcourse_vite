import { Button, Card } from "antd";
import { Helmet } from "react-helmet-async";

import PageHeader from "@/components/page-header";
import ReportList from "@/components/report-list";
import { useReports } from "@/services/report";

const ReportPage = () => {
  const { reports, loading } = useReports();

  return (
    <>
      <PageHeader title="我的反馈" onBack={() => history.back()} />
      <Helmet>
        <title>反馈 - SJTU选课社区</title>
      </Helmet>
      <Card
        title={`共有${reports ? reports.length : 0}条反馈`}
        extra={
          <Button
            type="primary"
            href={`mailto:${import.meta.env.VITE_CONTACT_EMAIL}`}
          >
            提交反馈
          </Button>
        }
      >
        <ReportList
          loading={loading}
          count={reports?.length}
          reports={reports}
        ></ReportList>
      </Card>
    </>
  );
};
export default ReportPage;
