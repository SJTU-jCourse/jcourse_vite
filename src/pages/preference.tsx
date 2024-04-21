import { Button, Card, Modal } from "antd";
import { useState } from "react";

import PageHeader from "@/components/page-header";
import ResetPasswordForm from "@/components/reset-password-form";
import { Helmet } from "react-helmet-async";

const PreferencePage = () => {
  const [resetModalOpen, setResetModalOpen] = useState<boolean>(false);
  return (
    <>
      <PageHeader title="偏好设置" onBack={() => history.back()} />
      <Helmet>
        <title>偏好设置 - SJTU选课社区</title>
      </Helmet>
      <Card title="登录安全">
        <Button onClick={() => setResetModalOpen(true)}>重置密码</Button>
        <Modal
          title="设置或重置登录密码"
          open={resetModalOpen}
          footer={null}
          onCancel={() => setResetModalOpen(false)}
        >
          <ResetPasswordForm
            onSuccessFinish={() => setResetModalOpen(false)}
          ></ResetPasswordForm>
        </Modal>
      </Card>
    </>
  );
};
export default PreferencePage;
