import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { logout } from "../../slices/loginSlice";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

function TeamComposition({ team_members, type }) {
  let [teamMembers, setTeamMembers] = useState([]);
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    getValues,
  } = useForm();

  console.log("team", teamMembers);
  //state

  let [errorMessage, setErrorMessage] = useState([]);

  //modal state
  let [showModal, setShowModal] = useState(0);

  const openModel = () => {
    setShowModal(1);
  };
  const closeModel = () => {
    setShowModal(0);
  };

  //function to eddit project
  const editMember = (memberObj) => {
    //open the model

    openModel();
    //set values in the model
    setValue("project_id", memberObj.project_id);
    setValue("resource_id", memberObj.resource_id);
    setValue("role", memberObj.role);
    setValue("billing_status", memberObj.billing_status);
    setValue("exposed_to_customer", memberObj.exposed_to_customer ? "1" : "0");
    setValue("allocation_type", memberObj.allocation_type);
    setValue("start_date", memberObj.start_date.split("T")[0]);
    setValue("end_date", memberObj.end_date?.split("T")[0]);
  };

  const saveMember = async () => {
    let token = localStorage.getItem("token");
    let updatedDetails = getValues();
    console.log(updatedDetails);
    // if end date is null remove from the  obj
    if (!updatedDetails.end_date) delete updatedDetails.end_date;

    try {
      //update the details in db
      let res = await axios.put(
        `http://localhost:4000/gdo/project-portfolio/detailed-view/team-composition/project_id/${updatedDetails.project_id}/emp_id/${updatedDetails.resource_id}`,
        updatedDetails,
        { headers: { Authorization: `bearer ${token}` } }
      );
      //close the model
      reset();
      setTeamMembers(res.data.updatedTeam);
      closeModel();
    } catch (err) {
      if (err.response.status == 401) {
        dispatch(logout());
        navigate("/");
      } else {
        setErrorMessage(err.message);
      }
    }
  };

  useEffect(() => {
    setTeamMembers(team_members);
  }, []);
  return (
    <div className="col-12" style={{ width: "100vw" }}>
      <div className="mt-5 border p-2">
        <h3>Team Composition</h3>
        <hr></hr>
        <Table responsive="lg" striped hover>
          <thead style={{ fontSize: "0.9rem" }}>
            <tr>
              <th>Employee Id</th>
              <th>Role</th>
              <th>Start date</th>
              <th>End date</th>
              <th>Status</th>
              <th>Billing status</th>
              <th>Exposed to customer</th>
              <th>Allocation Type</th>
              {type === "gdo" && <th>Edit</th>}
            </tr>
          </thead>
          <tbody style={{ fontSize: "0.9rem" }}>
            {teamMembers?.map((memberObj) => (
              <tr key={memberObj.resource_id}>
                <td>{memberObj.resource_id}</td>
                <td>{memberObj.role}</td>
                <td>{memberObj.start_date.split("T")[0]}</td>
                <td>
                  {memberObj.end_date ? memberObj.end_date.split("T")[0] : "-"}
                </td>
                <td>{memberObj.status}</td>
                <td>{memberObj.billing_status}</td>
                <td>{memberObj.exposed_to_customer ? "Yes" : "No"}</td>
                <td>{memberObj.allocation_type}</td>
                {type === "gdo" && (
                  <td>
                    <button
                      className="btn btn-warning"
                      onClick={() => editMember(memberObj)}
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </Table>

        {type === "gdo" && (
          <Modal
            show={showModal}
            onHide={closeModel}
            backdrop={"static"}
            size="lg"
          >
            <Modal.Header closeButton>
              <Modal.Title>Edit Project</Modal.Title>
            </Modal.Header>
            <form
              className="text-start   p-3 "
              style={{ borderRadius: "20px" }}
              onSubmit={handleSubmit(saveMember)}
            >
              <Modal.Body>
                <div className="row mb-3">
                  {/* project id only for process not visible to end user */}
                  <div>
                    <div className="col-12 col-md-6 col-lg-4">
                      <div className="mb-4">
                        <label className="mb-2 ">Project Id</label>
                        <input
                          type="text"
                          {...register("project_id")}
                          className="form-control"
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                  {/* resource id for display purpose and not editable */}
                  <div className="col-12 col-md-6 col-lg-4">
                    <div className="mb-4">
                      <label className="mb-2 ">Employee Id</label>
                      <input
                        type="text"
                        {...register("resource_id")}
                        className="form-control"
                        disabled
                      />
                    </div>
                  </div>

                  {/* role */}
                  <div className="col-12 col-md-6 col-lg-4">
                    <div className="mb-4">
                      <label className="mb-2">Role</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="role"
                        {...register("role", { required: true })}
                      ></input>
                      {errors.role?.type === "required" && (
                        <p className="text-danger">Enter role</p>
                      )}
                    </div>
                  </div>

                  {/* start date */}
                  <div className="col-12 col-md-6 col-lg-4">
                    <div className="mb-4">
                      <label className="mb-2">Start date</label>
                      <input
                        type="date"
                        {...register("start_date", { required: true })}
                        className="form-control"
                      ></input>
                      {errors.start_date?.type === "required" && (
                        <p className="text-danger">Select starting date</p>
                      )}
                    </div>
                  </div>

                  {/* end date */}

                  <div className="col-12 col-md-6 col-lg-4">
                    <div className="mb-4">
                      <label className="mb-2">End date (Optional)</label>
                      <input
                        type="date"
                        {...register("end_date")}
                        className="form-control"
                      ></input>
                    </div>
                  </div>

                  {/* billing status */}

                  <div className="col-12 col-md-6 col-lg-4">
                    <div className="mb-4">
                      <label className="mb-2">Billing Status</label>
                      <select
                        {...register("billing_status", { required: true })}
                        className="form-control"
                      >
                        <option value="">select billing status</option>
                        <option value="billed">Billed</option>
                        <option value="buffer">Buffer</option>
                      </select>
                      {errors.billing_status?.type === "required" && (
                        <p className="text-danger">Select billing status</p>
                      )}
                    </div>
                  </div>

                  {/*is exposed to customer */}
                  <div className="col-12 col-md-6 col-lg-4">
                    <div className="mb-4">
                      <label className="mb-2">Is Exposed to customer?</label>
                      <select
                        className="form-control"
                        {...register("exposed_to_customer", { required: true })}
                      >
                        <option value=""> --select-- </option>
                        <option value="0">No</option>
                        <option value="1">Yes</option>
                      </select>
                      {errors.exposed_to_customer?.type === "required" && (
                        <p className="text-danger">Select option</p>
                      )}
                    </div>
                  </div>

                  {/* allocation type */}
                  <div className="col-12 col-md-6 col-lg-4">
                    <div className="mb-4">
                      <label className="mb-2">Allocation Type</label>
                      <select
                        className="form-control"
                        {...register("allocation_type", { required: true })}
                      >
                        <option value=""> --select-- </option>
                        <option value="permanent">Permanent</option>
                        <option value="temporary">Temporary</option>
                      </select>
                      {errors.allocation_type?.type === "required" && (
                        <p className="text-danger">Select allocation type</p>
                      )}
                    </div>
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="primary" type="submit">
                  Save Changes
                </Button>
              </Modal.Footer>
            </form>
            <p className="text-danger text-center">{errorMessage}</p>
          </Modal>
        )}
      </div>
    </div>
  );
}

export default TeamComposition;
