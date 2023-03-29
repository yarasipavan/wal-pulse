import React from "react";
import TopNavbar from "../topNavbar/TopNavbar";
import { Outlet } from "react-router-dom";

function ProjectManagerRootLayout() {
  return (
    <div>
      <div>
        <TopNavbar />

        <div className="row w-100 m-0 mt-5 p-0   ">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default ProjectManagerRootLayout;
