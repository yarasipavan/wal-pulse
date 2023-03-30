import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

function RoleMap({ users, userLogout, getnewUsers, getAllUsers }) {
  let [message, setmessage] = useState("");
  let [errorMessage, setErrorMessage] = useState("");

  let {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (formObj) => {
    let token = localStorage.getItem("token");
    //role map
    try {
      let res = await axios.post(
        `http://localhost:4000/super-admin/role-mapping/employee/${formObj.emp_id}`,
        formObj,
        { headers: { Authorization: `bearer ${token}` } }
      );
      setmessage(res.data.message);
      getAllUsers();
      getnewUsers();
      setErrorMessage("");
      console.log(res.data);
      reset();
    } catch (err) {
      console.log(err);

      setmessage("");
      setErrorMessage(err.message);
    }
  };
  return (
    <div>
      <div className=" mx-auto shadow rounded pt-3 pb-3">
        <h4 className="text-center" style={{ color: "#4da484" }}>
          Role Mapping
        </h4>
        <form className=" w-75 mx-auto" onSubmit={handleSubmit(onSubmit)}>
          {/* emp id */}
          <div className="mt-3">
            <label className="mb-1" htmlFor="emp_id">
              Employee
            </label>
            <select
              className="form-control mt-1"
              id="emp_id"
              {...register("emp_id", { required: true })}
            >
              <option value=""> --Select Employee-- </option>
              {users.map((userObj) => (
                <option key={userObj.emp_id} value={userObj.emp_id}>
                  {userObj.name} - {userObj.emp_id}
                </option>
              ))}
            </select>
            {errors.emp_id?.type === "required" && (
              <p className="text-danger">Please select employee</p>
            )}
          </div>

          {/* Role */}
          <div className="mt-3">
            <label className="mb-1" htmlFor="role">
              Role
            </label>
            <select
              className="form-control mt-1"
              id="role"
              {...register("user_type", { required: true })}
            >
              <option value=""> -- select role -- </option>
              <option value="PROJECT-MANAGER"> Project Manager </option>
              <option value="GDO-HEAD"> GDO Head </option>
              <option value="HR"> HR </option>
              <option value="ACCOUNT-MANAGER">Account Manager</option>
              <option value="ADMIN-USER"> Admin User </option>
              <option value="SUPER-ADMIN"> Super Admin </option>
            </select>
            {errors.schedule_status?.type === "required" && (
              <p className="text-danger">Please select role</p>
            )}
          </div>

          <div className="mt-3 mb-5">
            <button className="btn btn-wal d-block form-control pt-2 pb-">
              Set Role
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
    </div>
  );
}

export default RoleMap;
