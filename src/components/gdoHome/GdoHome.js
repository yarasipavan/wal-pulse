import React from "react";

import AllProjects from "../allProjects/AllProjects";
import RaiseResourceRequest from "../raiseResourceRequest/RaiseResourceRequest";
import AllConcerns from "../allConcerns/AllConcerns";
import ActionCard from "../actionCard/ActionCard";

import teamImage from "../../images/team.svg";

function GdoHome() {
  return (
    <>
      <div className="row">
        <div className="col-12 col-md-10 col-lg-8 mt-5">
          <div className="row">
            <div className=" col">
              <AllProjects type={"gdo"} />
            </div>
          </div>
          <div className="row">
            <div className="col">
              <AllConcerns type={"gdo"} />
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 col-lg-4 mx-auto mt-5 ">
          <RaiseResourceRequest type={"gdo"} />
        </div>
      </div>

      <div className=" col-12 col-md-4 col-lg-4 mt-5">
        {/* <ActionCard
          image={teamImage}
          title="Add Team"
          body="Assign projects to employees  "
          link="/assign-team"
          action="Add Team"
        /> */}
      </div>
    </>
  );
}

export default GdoHome;
