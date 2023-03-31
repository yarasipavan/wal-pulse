import React from "react";
import TopNavbar from "../topNavbar/TopNavbar";
import { Outlet } from "react-router-dom";

function GdoRootLayout() {
  return (
    <div>
      <TopNavbar type="gdo" />
      <div className="container ">
        <div className=" row mt-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default GdoRootLayout;
