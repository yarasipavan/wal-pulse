import React, { useState, useEffect, memo } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import { logout } from "../../slices/loginSlice";
import Accordion from "react-bootstrap/Accordion";

function GetResourceRequests({ type }) {
  let navigate = useNavigate();
  let dispatch = useDispatch();

  //state from store
  let { user } = useSelector((store) => store.login);

  //state
  let [requests, setRequests] = useState([]);
  let [fetched, setFetched] = useState(0);
  let [errorMessage, setErrorMessage] = useState("");

  const getResourceRequests = () => {
    let token = localStorage.getItem("token");
    if (!user.user_type) {
      //logout completely
      dispatch(logout());
      navigate("/");
    }

    //get requests

    axios
      .get(`http://localhost:4000/${type}/resource-requests`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setRequests(res.data.payload);
        setFetched(1);
        setErrorMessage("");
      })
      .catch((err) => {
        if (err.response.status === "401") {
          //logout completely and navigate to login
          dispatch(logout());
          navigate("/");
        } else {
          //set error message
          setErrorMessage(err.message);
          setFetched(1);
        }
      });
  };

  useEffect(() => {
    getResourceRequests();
  }, []);

  console.log("get resource request ");
  return (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          <h4>All Resource Requests</h4>
        </Accordion.Header>
        <Accordion.Body>
          {!fetched && (
            <div className="d-flex justify-content-center">
              <div className="spinner-grow text-success" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          )}
          {errorMessage && <p>{errorMessage}</p>}
          {fetched && !errorMessage && requests?.length === 0 ? (
            <p className="text-center text-danger fw-bold">
              No resource requests{" "}
            </p>
          ) : (
            <Table responsive="sm" striped hover className="text-center">
              <thead style={{ fontSize: "0.9rem" }}>
                <tr>
                  <th>Request Id</th>
                  <th>Project Id</th>
                  <th>Project Name</th>
                  <th>Project GDO</th>
                  <th>Request Description</th>
                  <th>Requested On </th>
                </tr>
              </thead>
              <tbody style={{ fontSize: "0.9rem" }}>
                {requests?.map((requestObj) => (
                  <tr key={requestObj.request_id}>
                    <td>{requestObj.request_id}</td>
                    <td>{requestObj.project_id}</td>
                    <td>{requestObj.project.project_name}</td>
                    <td>{requestObj.project.gdo_head_id}</td>
                    <td>{requestObj.request_description}</td>

                    <td>{requestObj.request_on.split("T")[0]}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default memo(GetResourceRequests);
