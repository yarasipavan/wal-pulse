import React from "react";
import TopNavbar from "../topNavbar/TopNavbar";
import { Outlet } from "react-router-dom";

function OtherUserRootLayout() {
  return (
    <div>
      <TopNavbar type="user" />
      <h4 className="mt-3 text-danger text-center">
        Your role is not mapped ... Please contact any super admin for role
        mapping
      </h4>
      <Outlet />
    </div>
  );
}

export default OtherUserRootLayout;
