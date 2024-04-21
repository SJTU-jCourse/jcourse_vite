import { Layout } from "antd";
import { Outlet } from "react-router-dom";

const { Header, Content } = Layout;
export const LoginLayout = () => (
  <Layout className="login-layout">
    <Header className="header">
      <div className="title">SJTU 选课社区</div>
    </Header>
    <Content className="content">
      <Outlet />
    </Content>
  </Layout>
);
