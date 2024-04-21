import { Card } from "antd";
import { Helmet } from "react-helmet-async";

import AboutCard from "@/components/about-card";
import PageHeader from "@/components/page-header";

const AboutPage = () => {
  return (
    <>
      <PageHeader title="关于" onBack={() => history.back()} />
      <Helmet>
        <title>关于 - SJTU选课社区</title>
      </Helmet>
      <Card>
        <AboutCard />
      </Card>
    </>
  );
};
export default AboutPage;
