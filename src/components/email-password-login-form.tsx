import { Button, Form, Input, Typography } from "antd";
import { Link } from "react-router-dom";

import { EmailPasswordLoginRequest } from "@/lib/models";
import { AccountRule } from "@/lib/utils";

const EmailPasswordLoginForm = ({
  onFinish,
}: {
  onFinish: (request: EmailPasswordLoginRequest) => void;
}) => {
  const [form] = Form.useForm();

  return (
    <Form
      form={form}
      onFinish={onFinish}
      layout="horizontal"
      requiredMark="optional"
      size="large"
    >
      <Form.Item name="account" rules={[AccountRule]}>
        <Input
          id="email-password-account"
          suffix="@sjtu.edu.cn"
          placeholder="jAccount 用户名"
        />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: "请输入选课社区密码" }]}
      >
        <Input.Password
          id="email-password"
          placeholder="选课社区密码"
          size="large"
        />
      </Form.Item>

      <Form.Item
        extra={
          <>
            <div>
              <Typography.Text type="secondary">
                新用户请使用邮箱验证首次登录
              </Typography.Text>
            </div>
            <div>
              <Typography.Text type="secondary">
                注册后在<Link to="/preference">偏好设置</Link>
                中设定密码，可使用密码登录
              </Typography.Text>
            </div>
          </>
        }
      >
        <Button
          type="primary"
          htmlType="submit"
          style={{ width: "100%" }}
          size="large"
        >
          使用密码登录
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EmailPasswordLoginForm;
