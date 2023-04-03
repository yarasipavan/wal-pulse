import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { logout } from "../../slices/loginSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function RaiseResourceRequest({ type, projects, notifyDanger, notifySuccess }) {
  let dispatch = useDispatch();
  let navigate = useNavigate();

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
    let token = localStorage.getItem("token");
    //add date to formObj
    formObj.request_on = new Date();

    //call the api
    try {
      let res = await axios.post(
        `http://localhost:4000/gdo/resourse-request/project_id/${formObj.project_id}`,
        formObj,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMessage(res.data.message);
      toast.success(res.data.message);
      setErrorMessage("");
      reset();
    } catch (err) {
      if (err.response.status === 401) {
        //logout completely and navigate to login
        dispatch(logout());
        navigate("/");
      } else {
        setErrorMessage(err.response?.data?.alertMsg || err.message);
        toast.error(err.response?.data?.alertMsg || err.message);
        setMessage("");
      }
    }
  };

  console.log("raise Resource request renders");
  return (
    <div className=" mx-auto border rounded pt-3">
      <h4 className="text-center" style={{ color: "#4da484" }}>
        Raise Resourse Request
      </h4>
      <form className=" w-75 mx-auto" onSubmit={handleSubmit(onSubmit)}>
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
        <div className="mt-3">
          <label className="mb-2" htmlFor="request_description">
            Resource Request Description
          </label>
          <textarea
            className="form-control "
            rows={3}
            {...register("request_description", { required: true })}
          ></textarea>
          {errors.request_description?.type === "required" && (
            <p className="text-danger">
              Mention brief deatils of resource request
            </p>
          )}
        </div>

        <div className="mt-3 mb-3">
          <button className="btn btn-wal d-block form-control pt-2 pb-">
            Raise Resource
          </button>
        </div>
      </form>
      <div className="mt-3">
        <p className="text-danger text-center fw-bold">{errorMessage}</p>
      </div>
      <div className="mt-3">
        <p className="text-success text-center fw-bold">{message}</p>
      </div>
      <ToastContainer />
    </div>
  );
}

export default RaiseResourceRequest;
