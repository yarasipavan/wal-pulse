import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";
function ResetPassword() {
  let [errorMessage, setErrorMessage] = useState("");
  let [message, setMessage] = useState("");
  let {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [queryParameters] = useSearchParams();
  let token = queryParameters.get("token");

  const onSubmit = async (formObj) => {
    //add token into the form obj
    formObj.token = token;

    try {
      setMessage("");
      setErrorMessage("");
      let res = await axios.post(
        "http://localhost:4000/user-reset-password",
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
      console.log(err);
      setMessage("");
      setErrorMessage(err.message);
    }
  };
  return (
    <div>
      <h4>Reset Password</h4>
      <form className="mt-3" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <input
            type="password"
            placeholder="set you password"
            className="form-control p-3 "
            {...register("password", { required: true })}
          />
          {errors.password?.type === "required" && (
            <p className="text-danger">Please Set your password.</p>
          )}
        </div>

        <div className="mb-3">
          <button className="btn btn-wal d-block form-control pt-3 pb-3">
            Set Password
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

export default ResetPassword;
