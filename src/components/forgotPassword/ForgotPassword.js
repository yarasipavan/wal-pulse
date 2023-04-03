import React, { useState, memo } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link } from "react-router-dom";

function ForgotPassword() {
  let [errorMessage, setErrorMessage] = useState("");
  let [message, setMessage] = useState("");
  let {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (formObj) => {
    try {
      setMessage("");
      setErrorMessage("");
      let res = await axios.post(
        "http://localhost:4000/user-forgot-password",
        formObj
      );
      if (res.data.alertMsg) {
        throw new Error(res.data.alertMsg);
      } else {
        setMessage(res.data.message);
        setErrorMessage("");
        reset();
      }
    } catch (err) {
      setMessage("");
      setErrorMessage(err.message);
    }
  };
  return (
    <div>
      <h4>Forgot Password</h4>
      <form className="mt-3" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <input
            type="email"
            placeholder="Email"
            className="form-control p-3 "
            {...register("email", { required: true })}
          />
          {errors.email?.type === "required" && (
            <p className="text-danger">
              Please entera valid work email address.
            </p>
          )}
        </div>

        <div className="mb-3">
          <button className="btn btn-wal d-block form-control pt-3 pb-3">
            Send Mail
          </button>
        </div>
        <div className="mb-3">
          <Link to="/" style={{ textDecoration: "none" }}>
            Remembered Password? Login
          </Link>
        </div>
        <div className="mb-3 text-danger text-center fw-bold">
          {errorMessage}
        </div>
        <div className="mb-3 text-success text-center fw-bold">{message}</div>
      </form>
    </div>
  );
}

export default memo(ForgotPassword);
