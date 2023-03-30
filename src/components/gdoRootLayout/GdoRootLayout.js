import React from "react";
import TopNavbar from "../topNavbar/TopNavbar";
import { Outlet } from "react-router-dom";

function GdoRootLayout() {
  return (
    <div>
      <TopNavbar />
      <div className="container ">
        <div className=" row">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default GdoRootLayout;
