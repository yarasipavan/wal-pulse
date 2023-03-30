import React, { useState, useEffect } from "react";
import axios from "axios";
import { logout } from "../../slices/loginSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import AllProjects from "../allProjects/AllProjects";
import RaiseResourceRequest from "../raiseResourceRequest/RaiseResourceRequest";
import AllConcerns from "../allConcerns/AllConcerns";
import AddTeam from "../addTeam/AddTeam";

function GdoHome() {
  let [projects, setProjects] = useState([]);
  let [employees, setEmployees] = useState([]);

  let [fetched, setFetched] = useState(0);
  let [employeesFetched, setEmployeesFetched] = useState(0);

  let [errorMessage, setErrorMessage] = useState("");
  let token = localStorage.getItem("token");
  let dispatch = useDispatch();
  let navigate = useNavigate();

  //get all projects
  useEffect(() => {
    if (token === null) {
      //logout completely
      dispatch(logout());
      navigate("/");
    }
    axios
      .get(`http://localhost:4000/gdo/project-portfolio`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setProjects(res.data.payload);

        setErrorMessage("");
        setFetched(1);
      })
      .catch((err) => {
        setProjects([]);
        setErrorMessage(err.message);
        setFetched(1);
      });
  }, []);
  console.log("projects in home", projects);

  //get all employees
  useEffect(() => {
    if (token === null) {
      //logout completely
      dispatch(logout());
      navigate("/");
    }
    axios
      .get(`http://localhost:4000/gdo/employees`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setEmployees(res.data.payload);

        setErrorMessage("");
        setEmployeesFetched(1);
      })
      .catch((err) => {
        setProjects([]);
        setErrorMessage(err.message);
        setEmployeesFetched(1);
      });
  }, []);
  return (
    <div className="">
      {!fetched && !employeesFetched ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-grow text-success" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : fetched && errorMessage ? (
        errorMessage
      ) : (
        <div className="row ">
          <div className="col-12 col-md-10 col-lg-8 mt-5 mx-auto">
            <div className="row ">
              <div className=" col">
                <AllProjects type={"gdo"} projects={projects} />
              </div>
            </div>
            <div className="row mt-5">
              <div className="col">
                <AllConcerns type={"gdo"} />
              </div>
            </div>
            <div className="row mt-5">
              <div className="col">
                <AddTeam
                  type={"gdo"}
                  projects={projects}
                  employees={employees}
                />
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-4 mx-auto mt-5 ">
            <RaiseResourceRequest type={"gdo"} projects={projects} />
          </div>
        </div>
      )}
    </div>
  );
}

export default GdoHome;
