import React, { useState, useEffect, memo } from "react";
import axios from "axios";
import { logout } from "../../slices/loginSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import AllProjects from "../allProjects/AllProjects";
import RaiseResourceRequest from "../raiseResourceRequest/RaiseResourceRequest";
import AllConcerns from "../allConcerns/AllConcerns";
import AddTeam from "../addTeam/AddTeam";

function GdoHome({ notifyDanger, notifySuccess }) {
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
        if (err.response.data.alertMsg) {
          setErrorMessage(err.response.data.alertMsg);
        } else {
          setErrorMessage(err.message);
        }
        setProjects([]);
        setFetched(1);
      });
  }, []);

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
        if (err.response.status == 401) {
          setErrorMessage(err.response.data.alertMsg);
        } else {
          setErrorMessage(err.message);
        }
        setProjects([]);

        setEmployeesFetched(1);
      });
  }, []);

  console.log("gdo home renders");
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
          <div className="col-12 col-md-10 col-lg-8  mx-auto">
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
            <div className="row mt-5 mb-lg-5">
              <div className="col">
                <AddTeam
                  type={"gdo"}
                  projects={projects}
                  employees={employees}
                  notifyDanger={notifyDanger}
                  notifySuccess={notifySuccess}
                />
              </div>
            </div>
          </div>

          <div className=" mt-5 mt-lg-0 col-12 col-md-6 col-lg-4 mx-auto mb-5 ">
            <RaiseResourceRequest
              type={"gdo"}
              projects={projects}
              notifyDanger={notifyDanger}
              notifySuccess={notifySuccess}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default memo(GdoHome);
