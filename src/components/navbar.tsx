import {
  DollarOutlined,
  LogoutOutlined,
  ProfileOutlined,
  SearchOutlined,
  SettingOutlined,
  SyncOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Col, Dropdown, Menu, Row } from "antd";
import type { MenuProps } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { User } from "@/lib/models";
import { logout, toAdmin } from "@/services/user";

const NavBar = ({ user }: { user?: User }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const handleMenuClick = (e: { key: string }) => {
    if (e.key == "logout") {
      logout();
      navigate("/login");
    } else if (e.key == "account") {
      if (user?.is_staff) toAdmin();
    } else {
      navigate(e.key);
    }
  };
  const dropMenuItems: MenuProps["items"] = [
    {
      key: "account",
      label: user?.account,
      icon: <UserOutlined />,
    },
    { key: "/point", label: "社区积分", icon: <DollarOutlined /> },
    { key: "/activity", label: "我的点评", icon: <ProfileOutlined /> },
    { key: "/sync", label: "同步课表", icon: <SyncOutlined /> },
    { key: "/preference", label: "偏好设置", icon: <SettingOutlined /> },
    { type: "divider", key: "divider" },
    {
      key: "logout",
      label: "登出",
      icon: <LogoutOutlined />,
      danger: true,
    },
  ];

  const navItems = [
    { label: "最新", value: "/latest" },
    { label: "关注", value: "/follow-review" },
    { label: "课程", value: "/courses" },
  ];

  const navMenuItems = navItems.map((item) => {
    return {
      key: item.value,
      label: <Link to={item.value}>{item.label}</Link>,
    };
  });

  return (
    <Row className="navbar">
      <Col>
        <Link to="/latest" className="title">
          SJTU选课社区
        </Link>
      </Col>

      <Col className="col-menu" flex="auto">
        <Menu
          selectedKeys={[location.pathname]}
          className="menu"
          mode="horizontal"
          items={navMenuItems}
        ></Menu>
      </Col>
      <Col>
        <Link to="/search">
          <Button
            shape="circle"
            icon={<SearchOutlined />}
            className="search-button"
          />
        </Link>
      </Col>

      <Col>
        <Dropdown menu={{ onClick: handleMenuClick, items: dropMenuItems }}>
          <Button shape="circle" icon={<UserOutlined />}></Button>
        </Dropdown>
      </Col>
    </Row>
  );
};

export default NavBar;
