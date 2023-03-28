import React, { useState, useEffect, memo } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import { logout } from "../../slices/loginSlice";

function AllProjects({ type }) {
  let navigate = useNavigate();
  let dispatch = useDispatch();

  //state from store
  let { user } = useSelector((store) => store.login);

  //state
  let [projects, setProjects] = useState([]);
  let [fetched, setFetched] = useState(0);
  let [errorMessage, setErrorMessage] = useState("");

  const getDetailedView = (project_id, project_name) => {
    navigate(`detailed-view?project_name=${project_name}`, {
      state: { project_id: project_id, type: type },
    });
  };

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!user.user_type) {
      //logout completely
      dispatch(logout());
      navigate("/");
    }

    //get projects
    try {
      axios
        .get(`http://localhost:4000/${type}/project-portfolio`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setProjects(res.data.payload);
          setFetched(1);
          setErrorMessage("");
        });
    } catch (err) {
      //set error message
      setErrorMessage(err.message);
      setFetched(1);
    }
  }, []);
  return (
    <div>
      <h3>Projects Portfolio</h3>
      {!fetched && (
        <div className="d-flex justify-content-center">
          <div className="spinner-grow text-success" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
      {errorMessage && <p>{errorMessage}</p>}
      {fetched && !errorMessage && projects.length === 0 ? (
        <p>No Projects</p>
      ) : (
        <Table responsive="sm" striped hover>
          <thead style={{ fontSize: "0.9rem" }}>
            <tr>
              <th>Project Id</th>
              <th>Project Name</th>
              <th>Client</th>
              <th>Account Manager</th>
              <th>Project Maganer</th>
              <th>Fitness</th>
              <th>Status</th>
              <th>Start Date</th>
              <th>End Date</th>
            </tr>
          </thead>
          <tbody style={{ fontSize: "0.9rem" }}>
            {projects.map((projectObj, index) => (
              <tr
                key={index}
                onClick={() => {
                  getDetailedView(
                    projectObj.project_id,
                    projectObj.project_name
                  );
                }}
              >
                <td>{projectObj.project_id}</td>
                <td>{projectObj.project_name}</td>
                <td>{projectObj.client_account}</td>
                <td>{projectObj.account_manager_id}</td>
                <td>{projectObj.project_manager_id}</td>
                <td>{projectObj.fitness}</td>
                <td>{projectObj.status}</td>
                <td>{projectObj.start_date.split("T")[0]}</td>
                <td>{projectObj.end_date?.split("T")[0]}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}
export default memo(AllProjects);
