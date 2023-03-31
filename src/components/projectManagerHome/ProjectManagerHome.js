import React, { useState, useEffect } from "react";
import axios from "axios";
import { logout } from "../../slices/loginSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import AllProjects from "../allProjects/AllProjects";
import AllConcerns from "../allConcerns/AllConcerns";
import ProjectUpdateForm from "../projectUpdateForm/ProjectUpdateForm";
import ProjectConcernForm from "../projectConcernForm/ProjectConcernForm";

function ProjectManagerHome() {
  let [projects, setProjects] = useState([]);
  let [fetched, setFetched] = useState(0);
  let [errorMessage, setErrorMessage] = useState("");
  let token = localStorage.getItem("token");
  let dispatch = useDispatch();
  let navigate = useNavigate();

  useEffect(() => {
    if (token === null) {
      //logout completely
      dispatch(logout());
      navigate("/");
    } else {
      axios
        .get(`http://localhost:4000/project-manager/project-portfolio`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setProjects(res.data.payload);

          setErrorMessage("");
          setFetched(1);
        })
        .catch((err) => {
          if (err.response.status == 401) {
            setErrorMessage(err.response.data.alertMsg);
          } else {
            setErrorMessage(err.message);
          }
          setProjects([]);
          setFetched(1);
        });
    }
  }, []);
  console.log("projects in home", projects);
  return (
    <div className=" container ">
      {!fetched ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-grow text-success" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : fetched && errorMessage ? (
        errorMessage
      ) : (
        <>
          <div className="row">
            <div className="col">
              <AllProjects type={"project-manager"} projects={projects} />
            </div>
          </div>
          <div className="row mt-5">
            <div className="col">
              <AllConcerns type={"project-manager"} />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-12 col-md-8 col-lg-4 mx-auto mt-3">
              <ProjectUpdateForm type={"project-manager"} projects={projects} />
            </div>

            <div className="col-12 col-md-8 col-lg-4 mt-3 mx-auto ">
              <ProjectConcernForm
                type={"project-manager"}
                projects={projects}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default ProjectManagerHome;
