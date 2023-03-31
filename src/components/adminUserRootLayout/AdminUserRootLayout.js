import React from "react";
import TopNavbar from "../topNavbar/TopNavbar";
import { Outlet } from "react-router-dom";

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

export default AdminUserRootLayout;
