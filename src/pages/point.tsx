import { Card, Descriptions, Empty, Skeleton, Table, Typography } from "antd";
import { Helmet } from "react-helmet-async";

import PageHeader from "@/components/page-header";
import { useUserPoint } from "@/services/user";

const { Title, Paragraph } = Typography;

const PointPage = () => {
  const { points, loading } = useUserPoint();

  const columns = [
    {
      title: "时间",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "变动值",
      dataIndex: "value",
      key: "value",
    },
    { title: "描述", dataIndex: "description", key: "description" },
  ];
  return (
    <>
      <PageHeader title="社区积分"></PageHeader>
      <Helmet>
        <title>社区积分 - SJTU选课社区</title>
      </Helmet>
      <Card>
        <Typography>
          <Title level={5}>概览</Title>
          <Skeleton loading={loading}>
            {points ? (
              <Descriptions bordered>
                <Descriptions.Item label="总积分" className="total-point">
                  {points.points}
                </Descriptions.Item>
              </Descriptions>
            ) : (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )}
          </Skeleton>

          <Title level={5}>说明</Title>
          <Paragraph>
            自 2023 年 12 月 1 日起，选课社区积分暂时无法从发表点评、收获点赞等方式获取。
          </Paragraph>
          <Paragraph>
            您可以前往
            <a
              href="https://share.dyweb.sjtu.cn/"
              target="_blank"
              rel="noreferrer"
            >
              传承·交大
            </a>
            将选课社区积分兑换为传承积分。
          </Paragraph>
          <Title level={5}>积分详情</Title>
          <Skeleton loading={loading}>
            <Table
              tableLayout="fixed"
              dataSource={points?.details}
              columns={columns}
              pagination={false}
            ></Table>
          </Skeleton>
        </Typography>
      </Card>
    </>
  );
};
export default PointPage;
