import React from "react";
import TopNavbar from "../topNavbar/TopNavbar";
import { Outlet } from "react-router-dom";

function ProjectManagerRootLayout() {
  console.log("project manager root layout rendering");
  return (
    <div>
      <div>
        <TopNavbar type="project-manager" />

        <div className=" container    mt-5   ">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default ProjectManagerRootLayout;
