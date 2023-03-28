import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  //state
  let [errorMessage, setErrorMessage] = useState("");

  let navigate = useNavigate();

  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (formObj) => {
    try {
      let res = await axios.post(
        "http://localhost:4000/user-register",
        formObj
      );
      if (res.data.alertMsg) {
        setErrorMessage(res.data.alertMsg);
      } else {
        navigate("/");
      }
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  return (
    <div>
      <h4>Register to portal</h4>
      <form className="mt-3 mb-5" onSubmit={handleSubmit(onSubmit)}>
        {/* employee id */}
        <div className="mb-3">
          <label htmlFor="emp_id" className="mb-1">
            Employee ID
          </label>
          <input
            type="number"
            placeholder="Employee id"
            className="form-control p-2 "
            {...register("emp_id", { required: true })}
          />
          {errors.emp_id?.type === "required" && (
            <p className="text-danger">Please enter your employee Id</p>
          )}
        </div>

        {/* email */}
        <div className="mb-3">
          <label htmlFor="email" className="mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="Email"
            className="form-control p-2 "
            {...register("email", { required: true })}
          />
          {errors.email?.type === "required" && (
            <p className="text-danger">
              Please enter a valid work email address.
            </p>
          )}
        </div>

        {/* name */}
        <div className="mb-3">
          <label htmlFor="name" className="mb-1">
            Name
          </label>
          <input
            type="text"
            placeholder="Name"
            className="form-control p-2 "
            {...register("name", { required: true })}
          />
          {errors.name?.type === "required" && (
            <p className="text-danger">Please enter your name.</p>
          )}
        </div>

        {/* password */}
        <div className="mb-3">
          <label htmlFor="password" className="mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="Password"
            className="form-control p-2 "
            {...register("password", { required: true })}
          />
          {errors.password?.type === "required" && (
            <p className="text-danger">Please enter your password.</p>
          )}
        </div>

        <div className="mb-3">
          <button className="btn btn-wal d-block form-control pt-3 pb-3">
            Register
          </button>
        </div>
        <div className="mb-3 ">
          <Link
            to="/"
            style={{
              textDecoration: "none",
              fontSize: "1.1rem",
              color: "#4da484",
              borderBottom: "2px solid #4da484",
            }}
            className="float-end "
          >
            Click here to login
          </Link>
        </div>
      </form>
      <div className="mb-5 text-danger text-center fw-bold">{errorMessage}</div>
    </div>
  );
}

export default Register;
