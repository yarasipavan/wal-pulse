import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { logout } from "../../slices/loginSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function ProjectConcernForm({ type, projects }) {
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
    formObj.concern_raised_on = new Date();
    console.log("form obj", formObj);

    //call the api
    try {
      let res = await axios.post(
        `http://localhost:4000/${type}/project-concern/project_id/${formObj.project_id}`,
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
        console.log(err);
        setErrorMessage(err.message);
        setMessage("");
      }
    }
  };

  return (
    <div className=" mx-auto border rounded pt-3">
      <h4 className="text-center" style={{ color: "#4da484" }}>
        Raise Project Concern
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

        {/* concern discription */}
        <div className="mt-3">
          <label className="mb-2" htmlFor="concern_description">
            Concern Description
          </label>
          <textarea
            className="form-control "
            rows={3}
            {...register("concern_description", { required: true })}
          ></textarea>
          {errors.concern_description?.type === "required" && (
            <p className="text-danger">Enter your concern</p>
          )}
        </div>

        {/* raised by */}
        <div className="mt-3">
          <label className="mb-1" htmlFor="raised_by">
            Raised By
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Raise By.."
            {...register("raised_by")}
          />
          {errors.raised_by?.type === "required" && (
            <p className="text-danger">
              Enter the name who is the raised concern
            </p>
          )}
        </div>

        {/* resource status */}
        <div className="mt-3">
          <label className="mb-1" htmlFor="severity">
            Severity
          </label>
          <select
            className="form-control mt-1"
            {...register("severity", { required: true })}
          >
            <option value=""> -- resource status -- </option>
            <option value="low"> Low </option>
            <option value="medium"> Medium </option>
            <option value="high"> High </option>
          </select>
          {errors.severity?.type === "required" && (
            <p className="text-danger">Please select severity</p>
          )}
        </div>

        {/* is_concern_raised_internally */}
        <div className="mt-3">
          <label className="mb-1" htmlFor="is_concern_raised_internally">
            Is concern raised internally?
          </label>
          <select
            className="form-control mt-1"
            {...register("is_concern_raised_internally", { required: true })}
          >
            <option value=""> -- select option -- </option>
            <option value="1"> Yes </option>
            <option value="0"> No </option>
          </select>
          {errors.is_concern_raised_internally?.type === "required" && (
            <p className="text-danger">Please select option</p>
          )}
        </div>

        <div className="mt-3 mb-3">
          <button className="btn btn-wal d-block form-control pt-2 pb-">
            raise Concern
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

export default ProjectConcernForm;
