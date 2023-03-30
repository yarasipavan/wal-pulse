import React, { useState } from "react";
import { Accordion } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";
import { logout } from "../../slices/loginSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

function AddTeam({ type, projects, employees }) {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  let [message, setMessage] = useState("");
  let [errorMessage, setErrorMessage] = useState("");

  let token = localStorage.getItem("token");
  console.log(token);

  let {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  let formData = [];
  //onsubmit handler
  const onSubmit = async (formData) => {
    //add status active by default to form data
    formData.status = "active";
    //call api to send the request
    console.log(formData);
    let finalObj = { team_members: [formData] };
    try {
      let res = await axios.post(
        `http://localhost:4000/${type}/project-portfolio/detailed-view/team-composition/project_id/${formData.project_id}`,
        finalObj,
        { headers: { Authorization: `bearer ${token}` } }
      );

      setMessage(res.data.message);
      setErrorMessage("");
      reset();
    } catch (err) {
      console.log(err);
      if (err.response.status === 401) {
        //logout completely
        dispatch(logout());
        navigate("/");
      } else if (err.response.data.alertMsg) {
        setErrorMessage(err.response.data.alertMsg);
        setMessage("");
      } else {
        setErrorMessage(err.message);
        setMessage("");
      }
    }
  };

  return (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          <h4>Add Team Composition</h4>
        </Accordion.Header>
        <Accordion.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row mb-3">
              {/* project id */}
              <div className="col-12 col-md-6 col-lg-4">
                <div className="mb-4">
                  <label className="mb-2">Project</label>
                  <select
                    className="form-control"
                    {...register("project_id", { required: true })}
                  >
                    <option value="">--Select project--</option>
                    {projects.map((projectObj, index) => (
                      <option
                        key={projectObj.project_id}
                        value={projectObj.project_id}
                      >
                        {projectObj.project_name} - {projectObj.project_id}
                      </option>
                    ))}
                  </select>
                  {errors.project_id?.type === "required" && (
                    <p className="text-danger">Select project</p>
                  )}
                </div>
              </div>

              {/* resource id */}
              <div className="col-12 col-md-6 col-lg-4">
                <div className="mb-4">
                  <label className="mb-2">Employee</label>
                  <select
                    className="form-control"
                    {...register("resource_id", { required: true })}
                  >
                    <option value="">--Select employee --</option>
                    {employees.map((empObj, index) => (
                      <option key={empObj.emp_id} value={empObj.emp_id}>
                        {empObj.name} - {empObj.emp_id}
                      </option>
                    ))}
                  </select>
                  {errors.resource_id?.type === "required" && (
                    <p className="text-danger">Select Employee</p>
                  )}
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

            <button className="btn btn-wal d-block mx-auto ps-3 pe-3 ">
              Add
            </button>
          </form>

          <p className="text-center text-danger fw-bold">{errorMessage}</p>
          <p className="text-center text-success fw-bold">{message}</p>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default AddTeam;
