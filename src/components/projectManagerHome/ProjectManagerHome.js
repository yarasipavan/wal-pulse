import React from "react";

import AllProjects from "../allProjects/AllProjects";
import AllConcerns from "../allConcerns/AllConcerns";
import ProjectUpdateForm from "../projectUpdateForm/ProjectUpdateForm";
import ProjectConcernForm from "../projectConcernForm/ProjectConcernForm";

function ProjectManagerHome() {
  return (
    <div className=" container ">
      <div className=" row mt-3">
        <div className="col col-12 col-md-10 col-lg-8 mx-auto">
          <div className="row">
            <div className="col">
              <AllProjects type={"project-manager"} />
            </div>
          </div>
          <div className="row mt-5">
            <div className="col">
              <AllConcerns type={"project-manager"} />
            </div>
          </div>
        </div>

        <div className="col-12 col-md-8 col-lg-4 mx-auto">
          <ProjectUpdateForm type={"project-manager"} />
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-12 col-md-8 col-lg-4 ">
          <ProjectConcernForm type={"project-manager"} />
        </div>
      </div>
    </div>
  );
}

export default ProjectManagerHome;
