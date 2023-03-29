import React from "react";
import TopNavbar from "../topNavbar/TopNavbar";
import { Outlet } from "react-router-dom";

function GdoRootLayout() {
  return (
    <div>
      <TopNavbar />
      <div className="container m-0">
        <div className=" row" style={{ width: "100vw" }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default GdoRootLayout;
