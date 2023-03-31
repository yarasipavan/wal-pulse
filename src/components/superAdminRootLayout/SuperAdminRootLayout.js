import React from "react";
import TopNavbar from "../topNavbar/TopNavbar";
import { Outlet } from "react-router-dom";

function SuperAdminRootLayout() {
  return (
    <div>
      <TopNavbar type="super-admin" />
      <div className="container ">
        <div className=" row">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default SuperAdminRootLayout;
