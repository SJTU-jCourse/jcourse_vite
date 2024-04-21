import { Layout, Space } from "antd";
import { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";

import NavBar from "@/components/navbar";
import { CommonInfoContext } from "@/lib/context";
import { useCommonInfo } from "@/services/common";

const { Header, Content, Footer } = Layout;
export const BasicLayout = () => {
  const { commonInfo, error } = useCommonInfo();
  const navigate = useNavigate();
  useEffect(() => {
    if (error?.response?.status == 403) {
      const pathname = window.location.pathname;
      navigate("/login", { state: { next: pathname } });
    }
  }, [error]);
  return (
    <CommonInfoContext.Provider value={commonInfo}>
      <Layout className="basic-layout">
        <Header className="header">
          <NavBar user={commonInfo.user}></NavBar>
        </Header>
        <Content className="content">
          <Outlet />
        </Content>
        <Footer className="footer">
          <Space>
            <Link to="/about">关于</Link>
            <Link to="/faq">常见问题</Link>
            <Link to="/report">反馈</Link>
          </Space>
          <div>©2023 SJTU选课社区</div>
        </Footer>
      </Layout>
    </CommonInfoContext.Provider>
  );
};
