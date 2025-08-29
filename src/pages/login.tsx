import { App, Grid, Modal, Tabs, Typography } from "antd";
import { Helmet } from "react-helmet-async";
import { useNavigate, useSearchParams } from "react-router-dom";

import AboutCard from "@/components/about-card";
import AccountLoginForm from "@/components/account-login-form";
import EmailLoginForm from "@/components/email-login-form";
import EmailPasswordLoginForm from "@/components/email-password-login-form";
import {
  AccountLoginRequest,
  EmailLoginRequest,
  EmailPasswordLoginRequest,
} from "@/lib/models";
import {
  authEmailVerifyCode,
  emailPasswordLogin,
  login,
  postLogin,
} from "@/services/user";

const { Link, Text } = Typography;

const LOGIN_FORM_HEIGHT = "200px";

const LoginPage = () => {
  const { message } = App.useApp();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { next } = Object.fromEntries([...searchParams]);
  const [modal, contextHolder] = Modal.useModal();
  const screens = Grid.useBreakpoint();

  const onEmailLoginFinish = (request: EmailLoginRequest) => {
    authEmailVerifyCode(request.account, request.code)
      .then((data) => {
        postLogin(data, next, navigate);
      })
      .catch((error) => {
        message.error(error.response.data.detail);
      });
  };

  const onAccountLoginFinish = (request: AccountLoginRequest) => {
    login(request.username, request.password)
      .then((data) => {
        postLogin(data, next, navigate);
      })
      .catch((error) => {
        message.error(error.response.data.detail);
      });
  };

  const onEmailPasswordLoginFinish = (request: EmailPasswordLoginRequest) => {
    emailPasswordLogin(request.account, request.password)
      .then((data) => {
        postLogin(data, next, navigate);
      })
      .catch((error) => {
        message.error(error.response.data.detail);
      });
  };

  function info() {
    modal.info({
      title: "基本原则",
      content: <AboutCard />,
      okText: "确认",
      icon: null,
      width: screens.md ? "80%" : 520,
    });
  }

  const tabItems = [
    {
      label: "邮箱密码登录",
      key: "email-password",
      children: (
        <div style={{ height: LOGIN_FORM_HEIGHT }}>
          <EmailPasswordLoginForm onFinish={onEmailPasswordLoginFinish} />
        </div>
      ),
    },
    {
      label: "邮箱验证登录",
      key: "email",
      children: (
        <div style={{ height: LOGIN_FORM_HEIGHT }}>
          <EmailLoginForm onFinish={onEmailLoginFinish} />
        </div>
      ),
    },
    
    {
      label: "账号登录",
      key: "account",
      children: (
        <div style={{ height: LOGIN_FORM_HEIGHT }}>
          <AccountLoginForm onFinish={onAccountLoginFinish} />
        </div>
      ),
    },
  ];

  return (
    <div style={{ minWidth: "324px", marginInline: "auto" }}>
      <Helmet>
        <title>登录 - SJTU选课社区</title>
      </Helmet>
      <Tabs defaultActiveKey="jaccount" centered items={tabItems}></Tabs>
      <div style={{ textAlign: "center", marginTop: 16 }}>
        <Text>
          登录即表示您已阅读并同意本站
          <Link onClick={() => info()}>基本原则</Link>。{contextHolder}
        </Text>
      </div>
    </div>
  );
};

export default () => (
  <App>
    <LoginPage />
  </App>
);
