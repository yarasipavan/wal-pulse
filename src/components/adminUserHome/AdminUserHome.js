import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../slices/loginSlice";

import AllProjects from "../allProjects/AllProjects";
import AllConcerns from "../allConcerns/AllConcerns";
import AddProject from "../addProject.js/AddProject";
import GetResourceRequests from "../getResourceRequests/GetResourceRequests";

function AdminUserHome() {
  //state
  let { user } = useSelector((store) => store.login);

  let [projectManagers, setProjectManagers] = useState([]);
  let [gdoHeads, setGdoHeads] = useState([]);
  let [employees, setEmployees] = useState([]);
  let [projects, setProjects] = useState([]);

  let [managersFetched, setManagersFetched] = useState(0);
  let [gdosFetched, setGdosFetched] = useState(0);
  let [employeesFetched, setEmployeesFetched] = useState(0);
  let [projectsFetched, setProjectsFetched] = useState(0);

  let [errorMessage, setErrorMessage] = useState("");

  let [message, setMessage] = useState("");

  let token = localStorage.getItem("token");
  let navigate = useNavigate();
  let dispatch = useDispatch();

  //get gdos
  const getGdos = () => {
    if (!user.user_type) {
      //logout completely
      dispatch(logout());
      navigate("/");
    }
    //get gdo heads
    try {
      axios
        .get(`http://localhost:4000/admin-user/gdo-heads`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setGdoHeads(res.data.payload);
          setGdosFetched(1);
          setErrorMessage("");
        });
    } catch (err) {
      if (err.response.status === 401) {
        //logout completely and navigate to login
        dispatch(logout());
        navigate("/");
      } else {
        //set error message
        setErrorMessage(err.message);
        setGdosFetched(1);
      }
    }
  };

  //get project managers
  const getProjectManagers = () => {
    if (!user.user_type) {
      //logout completely
      dispatch(logout());
      navigate("/");
    }
    //get project managers
    try {
      axios
        .get(`http://localhost:4000/admin-user/project-managers`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setProjectManagers(res.data.payload);
          setManagersFetched(1);
          setErrorMessage("");
        });
    } catch (err) {
      if (err.response.status === 401) {
        //logout completely and navigate to login
        dispatch(logout());
        navigate("/");
      } else {
        //set error message
        setErrorMessage(err.message);
        setManagersFetched(1);
      }
    }
  };

  //get employees to set account manager
  const getEmployees = () => {
    if (!user.user_type) {
      //logout completely
      dispatch(logout());
      navigate("/");
    }
    //get employees
    try {
      axios
        .get(`http://localhost:4000/admin-user/employees`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setEmployees(res.data.payload);
          setEmployeesFetched(1);
          setErrorMessage("");
        });
    } catch (err) {
      if (err.response.status === 401) {
        //logout completely and navigate to login
        dispatch(logout());
        navigate("/");
      } else {
        //set error message
        setErrorMessage(err.message);
        setEmployees(1);
      }
    }
  };

  //get projects
  const getProjects = () => {
    if (token === null) {
      //logout completely
      dispatch(logout());
      navigate("/");
    } else {
      axios
        .get(`http://localhost:4000/admin-user/project-portfolio`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setProjects(res.data.payload);

          setErrorMessage("");
          setProjectsFetched(1);
        })
        .catch((err) => {
          setProjects([]);
          setErrorMessage(err.message);
          setProjectsFetched(1);
        });
    }
  };

  useEffect(() => {
    getGdos();
    getProjectManagers();
    getEmployees();
    getProjects();
  }, []);
  return (
    <div>
      {!managersFetched &&
      !gdosFetched &&
      !employeesFetched &&
      !projectsFetched ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-grow text-success" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : errorMessage ? (
        errorMessage
      ) : (
        <div>
          <AddProject
            type={"admin-user"}
            gdoHeads={gdoHeads}
            projectManagers={projectManagers}
            employees={employees}
          />
          <div className="row mt-5">
            <div className=" col-12 mx-auto">
              <AllProjects
                type={"admin-user"}
                projects={projects}
                gdoHeads={gdoHeads}
                projectManagers={projectManagers}
                employees={employees}
                getProjects={getProjects}
              />
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-12 mx-auto">
              <AllConcerns type={"admin-user"} />
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-12 mx-auto">
              <GetResourceRequests />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminUserHome;
