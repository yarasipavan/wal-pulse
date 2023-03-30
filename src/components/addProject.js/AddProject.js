import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../slices/loginSlice";
import { useForm } from "react-hook-form";
import Accordion from "react-bootstrap/Accordion";
import sampleAdd from "./sample";

function AddProject({ type, gdoHeads, projectManagers, employees }) {
  //states
  let { user } = useSelector((store) => store.login);

  let [errorMessage, setErrorMessage] = useState("");
  let [message, setMessage] = useState("");

  let token = localStorage.getItem("token");

  let {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  let dispatch = useDispatch();
  let navigate = useNavigate();

  // on Submit handler
  const onSubmit = async (formObj) => {
    //if enddate is null remove from form obj
    if (!formObj.end_date) {
      delete formObj.end_date;
    }
    try {
      let res = await axios.post(
        "http://localhost:4000/admin-user/new-project",
        formObj,
        { headers: { Authorization: `bearer ${token}` } }
      );
      console.log(res.data);
      setMessage(res.data.message);
      setErrorMessage("");
      reset();
    } catch (err) {
      console.log(err);
      if (err.response.status === 401) {
        //remove all from localstorage and navigate to login
        dispatch(logout());
        navigate("/");
      } else {
        setMessage("");
        setErrorMessage(err.message);
      }
    }
  };
  return (
    <Accordion defaultActiveKey="0">
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          <h4>Add Project</h4>
        </Accordion.Header>
        <Accordion.Body>
          <form
            className=" w-100  mx-auto mb-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="row">
              <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                {/* project name */}
                <div className="mt-3">
                  <label className="mb-1" htmlFor="project_name">
                    Project Name
                  </label>
                  <input
                    type="text"
                    placeholder="Project name"
                    className="form-control"
                    id="project_name"
                    {...register("project_name", { required: true })}
                  />
                  {errors.project_name?.type === "required" && (
                    <p className="text-danger">Please select project Id</p>
                  )}
                </div>
              </div>
              <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                {/* client */}
                <div className="mt-3">
                  <label className="mb-1" htmlFor="client_account">
                    Client
                  </label>
                  <input
                    type="text"
                    placeholder="Client"
                    className="form-control"
                    {...register("client_account", { required: true })}
                  />
                  {errors.client_account?.type === "required" && (
                    <p className="text-danger">Mention the client</p>
                  )}
                </div>
              </div>
              <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                {/* account manager id */}
                <div className="mt-3">
                  <label className="mb-1" htmlFor="account_manager_id">
                    Account manager
                  </label>
                  <select
                    className="form-control mt-1"
                    {...register("account_manager_id", { required: true })}
                  >
                    <option value=""> -- select -- </option>
                    {employees.map((empObj) => (
                      <option value={empObj.emp_id} key={empObj.emp_id}>
                        {empObj.name} - {empObj.emp_id}
                      </option>
                    ))}
                  </select>
                  {errors.account_manager_id?.type === "required" && (
                    <p className="text-danger">
                      Please select the account manager
                    </p>
                  )}
                </div>
              </div>

              <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                {/*GDO HEAD */}
                <div className="mt-3">
                  <label className="mb-1" htmlFor="gdo_head_id">
                    GDO Head
                  </label>
                  <select
                    className="form-control mt-1"
                    id="gdo_head_id"
                    {...register("gdo_head_id", { required: true })}
                  >
                    <option value=""> -- select -- </option>
                    {gdoHeads.map((gdoObj) => (
                      <option value={gdoObj.emp_id} key={gdoObj.emp_id}>
                        {gdoObj.name} - {gdoObj.emp_id}
                      </option>
                    ))}
                  </select>
                  {errors.gdo_head_id?.type === "required" && (
                    <p className="text-danger">Please select the GDO Head</p>
                  )}
                </div>
              </div>
              <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                {/*Project Manager */}
                <div className="mt-3">
                  <label className="mb-1" htmlFor="project_manager_id">
                    Project Manager
                  </label>
                  <select
                    className="form-control mt-1"
                    id="project_manager_id"
                    {...register("project_manager_id", { required: true })}
                  >
                    <option value=""> -- select -- </option>
                    {projectManagers.map((managerObj) => (
                      <option value={managerObj.emp_id} key={managerObj.emp_id}>
                        {managerObj.name} - {managerObj.emp_id}
                      </option>
                    ))}
                  </select>
                  {errors.project_manager_id?.type === "required" && (
                    <p className="text-danger">
                      Please select the project manager
                    </p>
                  )}
                </div>
              </div>
              <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                {/* fitness */}
                <div className="mt-3">
                  <label className="mb-1" htmlFor="fitness">
                    Fitness
                  </label>
                  <select
                    className="form-control"
                    {...register("fitness", { required: true })}
                  >
                    <option value=""></option>
                    <option value="green">Green</option>
                    <option value="amber">Amber</option>
                    <option value="red">Red</option>
                  </select>
                  {errors.fitness?.type === "required" && (
                    <p className="text-danger">Enter fitness of the project</p>
                  )}
                </div>
              </div>
              <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                {/* Domain */}
                <div className="mt-3">
                  <label className="mb-1" htmlFor="domain">
                    Domain of the project
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="domain"
                    {...register("domain", { required: true })}
                  />
                  {errors.domain?.type === "required" && (
                    <p className="text-danger">Enter domain of the project</p>
                  )}
                </div>
              </div>
              <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                {/* Type of the Project */}
                <div className="mt-3">
                  <label className="mb-1" htmlFor="type_of_project">
                    Project Type
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="DevOps, Test Automation....."
                    {...register("type_of_project", { required: true })}
                  />
                  {errors.type_of_project?.type === "required" && (
                    <p className="text-danger">Enter project type</p>
                  )}
                </div>
              </div>
              <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                {/* start date */}
                <div className="mt-3">
                  <label className="mb-1" htmlFor="start_date">
                    Project start date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    {...register("start_date", { required: true })}
                  />
                  {errors.start_date?.type === "required" && (
                    <p className="text-danger">Enter start date</p>
                  )}
                </div>
              </div>
              <div className="col-12 col-sm-6 col-md-4 col-lg-3">
                {/* project end data */}
                <div className="mt-3">
                  <label className="mb-1" htmlFor="end_date">
                    Project end date (optional)
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    {...register("end_date")}
                  />
                  {errors.start_date?.type === "required" && (
                    <p className="text-danger">Enter start date</p>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-4 ">
              <button className="btn btn-wal d-block mx-auto  ">
                Add Project
              </button>
            </div>
          </form>

          <div className="mt-3">
            <p className="text-danger text-center fw-bold">{errorMessage}</p>
          </div>
          <div className="mt-3">
            <p className="text-success text-center fw-bold">{message}</p>
          </div>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default AddProject;
