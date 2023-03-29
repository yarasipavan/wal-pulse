// import logo from './logo.svg';
// import './App.css';

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PublicRootLayout from "./components/publicRootLayout/PublicRootLayout";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import ForgotPassword from "./components/forgotPassword/ForgotPassword";
import ResetPassword from "./components/resetPassword/ResetPassword";

import AdminUserRootLayout from "./components/adminUserRootLayout/AdminUserRootLayout";
import GdoRootLayout from "./components/gdoRootLayout/GdoRootLayout";
import ProjectManagerRootLayout from "./components/projectManagerRootLayout/ProjectManagerRootLayout";
import SuperAdminRootLayout from "./components/superAdminRootLayout/SuperAdminRootLayout";
import OtherUserRootLayout from "./components/otherUserRootLayout/OtherUserRootLayout";

import GdoHome from "./components/gdoHome/GdoHome";
import DetailedView from "./components/detailedView/DetailedView";
import ProjectManagerHome from "./components/projectManagerHome/ProjectManagerHome";
import AdminUserHome from "./components/adminUserHome/AdminUserHome";

function App() {
  const browserRouterObj = createBrowserRouter([
    {
      path: "/",
      element: <PublicRootLayout />,
      children: [
        {
          path: "/",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "forgot-password",
          element: <ForgotPassword />,
        },
        {
          path: "reset-password",
          element: <ResetPassword />,
        },
      ],
    },
    {
      path: "/gdo",
      element: <GdoRootLayout />,
      children: [
        {
          path: "",
          element: <GdoHome />,
        },
        {
          path: "detailed-view",
          element: <DetailedView />,
        },
      ],
    },
    {
      path: "/project-manager",
      element: <ProjectManagerRootLayout />,
      children: [
        {
          path: "",
          element: <ProjectManagerHome />,
        },
        {
          path: "detailed-view",
          element: <DetailedView />,
        },
      ],
    },
    {
      path: "/super-admin",
      element: <SuperAdminRootLayout />,
    },
    {
      path: "/admin-user",
      element: <AdminUserRootLayout />,
      children: [
        {
          path: "",
          element: <AdminUserHome />,
        },
        {
          path: "detailed-view",
          element: <DetailedView />,
        },
      ],
    },
    {
      path: "/user",
      element: <OtherUserRootLayout />,
    },
  ]);
  return <RouterProvider router={browserRouterObj}></RouterProvider>;
}

export default App;
