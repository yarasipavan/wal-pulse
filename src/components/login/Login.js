import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../slices/loginSlice";
import { ToastContainer, toast } from "react-toastify";

function Login() {
  let { status, errorMessage, user } = useSelector((store) => store.login);
  let navigate = useNavigate();

  useEffect(() => {
    if (status === "success") {
      if (user.user_type === "GDO-HEAD") navigate("/gdo");
      else if (user.user_type === "PROJECT-MANAGER") {
        navigate("/project-manager");
      } else if (user.user_type === "SUPER-ADMIN") {
        navigate("/super-admin");
      } else if (user.user_type === "ADMIN-USER") {
        navigate("/admin-user");
      } else if (user.user_type === "null") {
        navigate("/user");
      }
    }
  }, [status]);

  const notifyDanger = (msg) => {
    toast.error(msg);
  };
  const notifySuccess = (msg) => {
    toast.success(msg);
  };

  let dispatch = useDispatch();
  let {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  //on submit handler function
  const onSubmit = (credentialsObj) => {
    dispatch(userLogin(credentialsObj));
  };
  return (
    <div>
      <ToastContainer />
      <h4>Login to portal</h4>
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
          <input
            type="password"
            placeholder="Password"
            className="form-control p-3 "
            {...register("password", { required: true })}
          />
          {errors.password?.type === "required" && (
            <p className="text-danger">Please enter your password.</p>
          )}
        </div>

        <div className="mb-3">
          <button className="btn btn-wal d-block form-control pt-3 pb-3">
            Login
          </button>
        </div>
        <div className="mb-3">
          <Link to="forgot-password" style={{ textDecoration: "none" }}>
            Forgot Password
          </Link>
          <Link
            to="register"
            style={{
              textDecoration: "none",
              fontSize: "1.1rem",
              color: "#4da484",
              borderBottom: "2px solid #4da484",
            }}
            className="float-end "
          >
            Click here to register
          </Link>
        </div>
        <div className="mb-3 text-danger text-center fw-bold">
          {errorMessage ? notifyDanger(errorMessage) : ""}
        </div>
      </form>
    </div>
  );
}

export default Login;
