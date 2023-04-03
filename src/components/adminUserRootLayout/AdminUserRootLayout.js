import React, { memo } from "react";
import TopNavbar from "../topNavbar/TopNavbar";
import { Outlet } from "react-router-dom";

console.log("admin user root layout component rendering");

function AdminUserRootLayout() {
  return (
    <div>
      <TopNavbar type="admin-user" />
      <div className="container mt-5 ">
        <div className=" row">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default memo(AdminUserRootLayout);
