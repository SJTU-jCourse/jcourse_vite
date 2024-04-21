import { ConfigProvider, theme } from "antd";
import zhCN from "antd/locale/zh_CN";
import { HelmetProvider } from "react-helmet-async";
import { useMediaQuery } from "react-responsive";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { SWRConfig } from "swr";

import ActivityPage from "./pages/activity";
import CoursePage from "./pages/course";
import CourseListPage from "./pages/courses";
import FollowCoursePage from "./pages/follow-course";
import FollowReviewPage from "./pages/follow-review";
import LoginPage from "./pages/login";
import PointPage from "./pages/point";
import PreferencePage from "./pages/preference";
import ReportPage from "./pages/report";
import ReviewLocationPage from "./pages/review";
import SearchPage from "./pages/search";
import StatisticPage from "./pages/statistics";
import SyncPage from "./pages/sync";
import WriteReviewPage from "./pages/write-review";

import "@/App.css";
import { BasicLayout } from "@/components/basic-layout";
import { LoginLayout } from "@/components/login-layout";
import NotFoundPage from "@/pages/404";
import AboutPage from "@/pages/about";
import FaqPage from "@/pages/faq";
import LatestReviewPage from "@/pages/latest";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginLayout />,
    children: [{ path: "", element: <LoginPage /> }],
  },
  {
    path: "/",
    element: <BasicLayout />,
    children: [
      {
        path: "",
        element: <LatestReviewPage />,
      },
      {
        path: "latest",
        element: <LatestReviewPage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "faq",
        element: <FaqPage />,
      },
      {
        path: "activity",
        element: <ActivityPage />,
      },
      {
        path: "courses",
        element: <CourseListPage />,
      },
      {
        path: "point",
        element: <PointPage />,
      },
      {
        path: "preference",
        element: <PreferencePage />,
      },
      {
        path: "follow-course",
        element: <FollowCoursePage />,
      },
      {
        path: "follow-review",
        element: <FollowReviewPage />,
      },
      {
        path: "report",
        element: <ReportPage />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
      {
        path: "statistics",
        element: <StatisticPage />,
      },
      {
        path: "sync",
        element: <SyncPage />,
      },
      {
        path: "write-review",
        element: <WriteReviewPage />,
      },
      {
        path: "course/:id",
        element: <CoursePage />,
      },
      {
        path: "review/:id",
        element: <ReviewLocationPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

function App() {
  const isDark = useMediaQuery({
    query: "(prefers-color-scheme: dark)",
  });

  return (
    <SWRConfig value={{ shouldRetryOnError: false, revalidateOnFocus: false }}>
      <ConfigProvider
        locale={zhCN}
        theme={{
          algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
          token: { colorPrimary: "#1DA57A", colorInfo: "#1DA57A" },
        }}
      >
        <HelmetProvider>
          <RouterProvider router={router} />
        </HelmetProvider>
      </ConfigProvider>
    </SWRConfig>
  );
}

export default App;
