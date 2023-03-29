import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "./DetailedView.css";
import { logout } from "../../slices/loginSlice";
import { useDispatch } from "react-redux";

import ProjectDetails from "../projectDetails/ProjectDetails";
import TeamComposition from "../teamComposition/TeamComposition";
import ProjectUpdates from "../projectUpdates/ProjectUpdates";
import ProjectConcerns from "../projectConcerns/ProjectConcerns";

function DetailedView() {
  let { state } = useLocation();
  let navigate = useNavigate();
  let dispatch = useDispatch();

  let token = localStorage.getItem("token");

  //state
  let [detailedView, setDetailedView] = useState(0);
  let [errorMessage, setErrorMessage] = useState("");
  let [bg, setBg] = useState("");

  //if this component is directly accessed then send back to home page
  useEffect(() => {
    if (!state) {
      navigate("/gdo");
    }
  }, []);

  // get detailed view
  useEffect(() => {
    //if token is not present redirect to login page
    if (token === null) navigate("/");
    //call the api
    axios
      .get(
        `http://localhost:4000/${state.type}/project-portfolio/detailed-view/project_id/${state.project_id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((res) => {
        setDetailedView(res.data.payload);
        setErrorMessage("");

        //set style color
        bg =
          res.data.payload.fitness === "green"
            ? setBg("green")
            : res.data.payload.fitness === "amber"
            ? setBg("#ffbf00")
            : setBg("#ff0000");
      })
      .catch((err) => {
        if (err.status === 401) {
          //i.e token expired then clear all from localstorage and redirect to login
          dispatch(logout());
          navigate("/");
        }
        if (err.response.status === 404) {
          setErrorMessage(err.response.data.alertMsg);
        } else {
          setErrorMessage(err.message);
        }
      });
  }, []);

  return (
    <div>
      <h4>Detailed view</h4>

      {errorMessage ? (
        <p className="text-danger fw-bold text-center">{errorMessage}</p>
      ) : (
        <div className="row w-100 m-0">
          {/* top indicators */}
          <div className="row mx-auto ">
            <div className="col-12 col-md-4 col-lg-3 mx-auto mb-3 ">
              <div className="card">
                <div className="card-header">Fitness</div>
                <div className="card-body" style={{}}>
                  <div className="float-start">
                    <span className="fitness-color fw-bold">
                      {detailedView.fitness}
                    </span>
                  </div>
                  <div
                    className="float-end fitness-bar"
                    style={{ backgroundColor: `${bg}` }}
                  ></div>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-4 col-lg-3 mx-auto mb-3 ">
              <div className="card">
                <div className="card-header">Concerns</div>
                <div className="card-body d-flex justify-content-between">
                  <div className="float-start fw-bold ">Concerns raised</div>
                  <div className="float-end concerns-count text-warning fw-bold fs-5">
                    {detailedView.concerns_count}
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-4 col-lg-3 mx-auto mb-3 ">
              <div className="card">
                <div className="card-header">Team Count</div>

                <div className="card-body d-flex justify-content-between">
                  <div className="float-start fw-bold ">Billed Count</div>
                  <div className="float-end concerns-count text-primary fw-bold fs-5">
                    {detailedView.team_billed_count}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* project details */}
          <ProjectDetails detailedView={detailedView} />

          {/* team composition */}
          <TeamComposition team_members={detailedView.team_members} />

          {/* Project Updates */}
          <ProjectUpdates project_updates={detailedView.project_updates} />

          {/* project concerns */}
          <ProjectConcerns project_concerns={detailedView.project_concerns} />
        </div>
      )}
    </div>
  );
}

export default DetailedView;
