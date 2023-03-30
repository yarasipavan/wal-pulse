import React, { useState, useEffect, memo } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";

import Accordion from "react-bootstrap/Accordion";

function AllProjects({ type, projects }) {
  let navigate = useNavigate();

  //state from store
  let { user } = useSelector((store) => store.login);

  //state
  // var [projects, setProjects] = useState([]);

  const getDetailedView = (project_id, project_name) => {
    navigate(`detailed-view?project_name=${project_name}`, {
      state: { project_id: project_id, type: type },
    });
  };

  // useEffect(() => {
  //   let token = localStorage.getItem("token");
  //   if (!user.user_type) {
  //     //logout completely
  //     dispatch(logout());
  //     navigate("/");
  //   }

  //   //get projects
  //   try {
  //     axios
  //       .get(`http://localhost:4000/${type}/project-portfolio`, {
  //         headers: { Authorization: `Bearer ${token}` },
  //       })
  //       .then((res) => {
  //         setProjects(res.data.payload);
  //         setFetched(1);
  //         setErrorMessage("");
  //       });
  //   } catch (err) {
  //     //set error message
  //     setErrorMessage(err.message);
  //     setFetched(1);
  //   }
  // }, []);
  return (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          <h4>Projects Portfolio</h4>
        </Accordion.Header>
        <Accordion.Body>
          {projects.length === 0 ? (
            <p>No Projects</p>
          ) : (
            <>
              <p className="text-danger">
                Click at anywhere on the project details to get detailed view of
                particular project
              </p>
              <Table responsive="sm" striped hover className="text-center">
                <thead style={{ fontSize: "0.9rem" }}>
                  <tr>
                    <th>Project Id</th>
                    <th>Project Name</th>
                    <th>Client</th>
                    <th>Account Manager</th>
                    <th>GDO Head</th>
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
                      style={{ cursor: "pointer" }}
                    >
                      <td>{projectObj.project_id}</td>
                      <td>{projectObj.project_name}</td>
                      <td>{projectObj.client_account}</td>
                      <td>{projectObj.account_manager_id}</td>
                      <td>{projectObj.gdo_head_id}</td>
                      <td>{projectObj.project_manager_id}</td>
                      <td>{projectObj.fitness}</td>
                      <td>{projectObj.status}</td>
                      <td>{projectObj.start_date.split("T")[0]}</td>
                      <td>
                        {projectObj.end_date
                          ? projectObj.end_date.split("T")[0]
                          : "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          )}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}
export default memo(AllProjects);
