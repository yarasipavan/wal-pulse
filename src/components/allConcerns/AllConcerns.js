import React, { useState, useEffect, memo } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import { logout } from "../../slices/loginSlice";

function AllConcerns({ type }) {
  let navigate = useNavigate();
  let dispatch = useDispatch();

  //state from store
  let { user } = useSelector((store) => store.login);

  //state
  let [concerns, setConcerns] = useState([]);
  let [fetched, setFetched] = useState(0);
  let [errorMessage, setErrorMessage] = useState("");

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
        .get(`http://localhost:4000/${type}/project-concerns`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setConcerns(res.data.payload);
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
      <h3>All Concerns</h3>
      {!fetched && (
        <div class="d-flex justify-content-center">
          <div class="spinner-grow text-success" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      )}
      {errorMessage && <p>{errorMessage}</p>}
      {fetched && !errorMessage && concerns.length === 0 ? (
        <p className="text-center text-danger fw-bold">No Concerns </p>
      ) : (
        <Table responsive="sm" striped hover className="text-center">
          <thead style={{ fontSize: "0.9rem" }}>
            <tr>
              <th>Concern Id</th>
              <th>Project Id</th>
              <th>Project Name</th>
              <th>Project manager</th>
              <th>Concern Description</th>
              <th>Severity</th>
              <th>Status</th>
              <th>Raised On</th>
              <th>Mitigated On</th>
            </tr>
          </thead>
          <tbody style={{ fontSize: "0.9rem" }}>
            {concerns.map((concernObj) => (
              <tr key={concernObj.id}>
                <td>{concernObj.id}</td>
                <td>{concernObj.project.project_id}</td>
                <td>{concernObj.project.project_name}</td>
                <td>{concernObj.project.project_manager_id}</td>
                <td>{concernObj.concern_description}</td>
                <td>{concernObj.severity}</td>
                <td>{concernObj.status}</td>

                <td>{concernObj.concern_raised_on.split("T")[0]}</td>
                <td>
                  {concernObj.mitigated_on
                    ? concernObj.mitigated_on.split("T")[0]
                    : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default AllConcerns;
