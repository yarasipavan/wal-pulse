// import logo from './logo.svg';
// import './App.css';

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PublicRootLayout from "./components/publicRootLayout/PublicRootLayout";
import Login from "./components/login/Login";

import OtherUserRootLayout from "./components/otherUserRootLayout/OtherUserRootLayout";
import SuperAdminHome from "./components/superAdminHome/SuperAdminHome";
import DetailedView from "./components/detailedView/DetailedView";
import AdminUserRootLayout from "./components/adminUserRootLayout/AdminUserRootLayout";
import Profile from "./components/profile/Profile";
import { lazy, Suspense } from "react";
import ErrorPage from "./components/errorPage/ErrorPage";

let GdoHome = lazy(() => import("./components/gdoHome/GdoHome"));
let ProjectManagerHome = lazy(() =>
  import("./components/projectManagerHome/ProjectManagerHome")
);
let AdminUserHome = lazy(() =>
  import("./components/adminUserHome/AdminUserHome")
);

// let AdminUserRootLayout = lazy(() => {
//   "./components/adminUserRootLayout/AdminUserRootLayout";
// });

let GdoRootLayout = lazy(() =>
  import("./components/gdoRootLayout/GdoRootLayout")
);
let ProjectManagerRootLayout = lazy(() =>
  import("./components/projectManagerRootLayout/ProjectManagerRootLayout")
);
let SuperAdminRootLayout = lazy(() =>
  import("./components/superAdminRootLayout/SuperAdminRootLayout")
);

let Register = lazy(() => import("./components/register/Register"));
let ForgotPassword = lazy(() =>
  import("./components/forgotPassword/ForgotPassword")
);
let ResetPassword = lazy(() =>
  import("./components/resetPassword/ResetPassword")
);

// let Profile=lazy(()=>{
//   import ("./components/profile/Profile")
// })

function App() {
  const browserRouterObj = createBrowserRouter([
    {
      path: "/",
      element: <PublicRootLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <Login />,
        },
        {
          path: "register",
          element: (
            <Suspense fallback="loading....">
              <Register />
            </Suspense>
          ),
        },
        {
          path: "forgot-password",
          element: (
            <Suspense fallback="loading....">
              <ForgotPassword />
            </Suspense>
          ),
        },
        {
          path: "reset-password",
          element: (
            <Suspense fallback="loading....">
              <ResetPassword />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: "/gdo",
      element: (
        <Suspense fallback="loading....">
          <GdoRootLayout />
        </Suspense>
      ),
      children: [
        {
          path: "",
          element: (
            <Suspense fallback={"Loading..."}>
              <GdoHome />
            </Suspense>
          ),
        },
        {
          path: "detailed-view",
          element: <DetailedView />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
      ],
    },
    {
      path: "/project-manager",
      element: (
        <Suspense fallback="loading....">
          <ProjectManagerRootLayout />
        </Suspense>
      ),
      children: [
        {
          path: "",
          element: (
            <Suspense fallback="loading....">
              <ProjectManagerHome />
            </Suspense>
          ),
        },
        {
          path: "detailed-view",
          element: <DetailedView />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
      ],
    },
    {
      path: "/super-admin",
      element: (
        <Suspense fallback="loading....">
          <SuperAdminRootLayout />
        </Suspense>
      ),
      children: [
        {
          path: "",
          element: <SuperAdminHome />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
      ],
    },
    {
      path: "/admin-user",
      element: <AdminUserRootLayout />,
      children: [
        {
          path: "",
          element: (
            <Suspense fallback="loading....">
              <AdminUserHome />
            </Suspense>
          ),
        },
        {
          path: "detailed-view",
          element: <DetailedView />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
      ],
    },
    {
      path: "/user",
      element: <OtherUserRootLayout />,
      children: [
        {
          path: "profile",
          element: <Profile />,
        },
      ],
    },
  ]);
  return <RouterProvider router={browserRouterObj}></RouterProvider>;
}

export default App;
