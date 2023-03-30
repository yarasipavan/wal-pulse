import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { logout } from "../../slices/loginSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function ProjectUpdateForm({ type, projects }) {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let token = localStorage.getItem("token");

  let [errorMessage, setErrorMessage] = useState("");
  let [message, setMessage] = useState("");

  let {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // function to handle submit
  const onSubmit = async (formObj) => {
    //add date to formObj
    formObj.date = new Date();
    console.log("form obj", formObj);

    //call the api
    try {
      let res = await axios.post(
        `http://localhost:4000/${type}/project-update/project_id/${formObj.project_id}`,
        formObj,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMessage(res.data.message);
      setErrorMessage("");
      reset();
    } catch (err) {
      if (err.response.status === 401) {
        //logout completely and navigate to login
        dispatch(logout());
        navigate("/");
      } else {
        setErrorMessage(err.message);
        setMessage("");
      }
    }
  };

  return (
    <div className=" mx-auto border rounded pt-3">
      <h4 className="text-center" style={{ color: "#4da484" }}>
        Post Project Update
      </h4>
      <form className=" w-75 mx-auto" onSubmit={handleSubmit(onSubmit)}>
        {/* project id */}
        <div className="mt-3">
          <label className="mb-1" htmlFor="project_id">
            Select Project
          </label>
          <select
            className="form-control mt-1"
            {...register("project_id", { required: true })}
          >
            <option value=""> Select Project </option>
            {projects.map((projetcObj, index) => (
              <option key={index} value={projetcObj.project_id}>
                {projetcObj.project_name}-{projetcObj.project_id}
              </option>
            ))}
          </select>
          {errors.project_id?.type === "required" && (
            <p className="text-danger">Please select project Id</p>
          )}
        </div>

        {/* update discription */}
        <div className="mt-3">
          <label className="mb-2" htmlFor="update_description">
            Update Description
          </label>
          <textarea
            className="form-control "
            rows={3}
            {...register("update_description", { required: true })}
          ></textarea>
          {errors.update_description?.type === "required" && (
            <p className="text-danger">Enter project updates</p>
          )}
        </div>

        {/* schedule status */}
        <div className="mt-3">
          <label className="mb-1" htmlFor="schedule_status">
            Schedule Status
          </label>
          <select
            className="form-control mt-1"
            {...register("schedule_status", { required: true })}
          >
            <option value=""> -- schedule status -- </option>
            <option value="green"> Green </option>
            <option value="amber"> Amber </option>
            <option value="red"> Red </option>
          </select>
          {errors.schedule_status?.type === "required" && (
            <p className="text-danger">Please select schedule status</p>
          )}
        </div>

        {/* resource status */}
        <div className="mt-3">
          <label className="mb-1" htmlFor="resourcing_status">
            Resource Status
          </label>
          <select
            className="form-control mt-1"
            {...register("resourcing_status", { required: true })}
          >
            <option value=""> -- resource status -- </option>
            <option value="green"> Green </option>
            <option value="amber"> Amber </option>
            <option value="red"> Red </option>
          </select>
          {errors.resourcing_status?.type === "required" && (
            <p className="text-danger">Please select resource status</p>
          )}
        </div>

        {/* quality status */}
        <div className="mt-3">
          <label className="mb-1" htmlFor="quality_status">
            Quality Status
          </label>
          <select
            className="form-control mt-1"
            {...register("quality_status", { required: true })}
          >
            <option value=""> -- quality status -- </option>
            <option value="green"> Green </option>
            <option value="amber"> Amber </option>
            <option value="red"> Red </option>
          </select>
          {errors.quality_status?.type === "required" && (
            <p className="text-danger">Please select quality status</p>
          )}
        </div>

        {/* waiting for client inputs */}
        <div className="mt-3">
          <label className="mb-1" htmlFor="waiting_for_client_inputs">
            Is waiting for client inputs?
          </label>
          <select
            className="form-control mt-1"
            {...register("waiting_for_client_inputs", { required: true })}
          >
            <option value=""> -- select option -- </option>
            <option value="1"> Yes </option>
            <option value="0"> No </option>
          </select>
          {errors.waiting_for_client_inputs?.type === "required" && (
            <p className="text-danger">Please select option</p>
          )}
        </div>

        <div className="mt-3 mb-3">
          <button className="btn btn-wal d-block form-control pt-2 pb-">
            Post Update
          </button>
        </div>
      </form>
      <div className="mt-3">
        <p className="text-danger text-center fw-bold">{errorMessage}</p>
      </div>
      <div className="mt-3">
        <p className="text-success text-center fw-bold">{message}</p>
      </div>
    </div>
  );
}

export default ProjectUpdateForm;
