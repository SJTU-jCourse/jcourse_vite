import { Result } from "antd";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

import ContactEmail from "@/components/contact-email";

const NotFoundPage = () => {
  return (
    <>
      <Helmet>
        <title>404 - SJTU选课社区</title>
      </Helmet>
      <Result
        status="404"
        title="哎呀抱歉，你要找的页面找不到了"
        subTitle={
          <span>
            如果这是网站的bug，或者要找的页面对你很重要，请通过
            <Link to="/report">反馈</Link>或者邮件
            <ContactEmail />
            联系我们
          </span>
        }
      />
    </>
  );
};
export default NotFoundPage;
