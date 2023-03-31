import React, { useEffect, useState } from "react";
import axios from "axios";
import { logout } from "../../slices/loginSlice";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import RoleMap from "../roleMap/RoleMap";
import UserDetails from "../userDetails/UserDetails";

function SuperAdminHome() {
  // get logged in user details from store
  let { user, status } = useSelector((store) => store.login);
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let token = localStorage.getItem("token");

  //state
  let [users, setUsers] = useState([]);
  let [newUsers, setNewUsers] = useState([]);
  let [errorMessage, setErrorMessage] = useState("");

  //get all users and get all active users
  const getAllUsers = async () => {
    if (token) {
      try {
        let res = await axios.get("http://localhost:4000/super-admin/users", {
          headers: { Authorization: `bearer ${token}` },
        });
        setUsers(res.data.payload);
        setErrorMessage("");
      } catch (err) {
        if (err.response.status === 401) {
          dispatch(logout());
          navigate("/");
        } else {
          setErrorMessage(err.message);
          setUsers([]);
        }
      }
    } else {
      dispatch(logout());
      navigate("/");
    }
  };

  const getnewUsers = async () => {
    if (token) {
      try {
        let res = await axios.get(
          "http://localhost:4000/super-admin/active-users",
          {
            headers: { Authorization: `bearer ${token}` },
          }
        );
        setNewUsers(res.data.payload);
        setErrorMessage("");
      } catch (err) {
        if (err.response.status === 401) {
          dispatch(logout());
          navigate("/");
        } else {
          setErrorMessage(err.message);
          setNewUsers([]);
        }
      }
    } else {
      dispatch(logout());
      navigate("/");
    }
  };

  useEffect(() => {
    //check whether the super admin user accessing or not . if not navigate to login
    if (user.user_type == "SUPER-ADMIN" && status == "success") {
      getAllUsers();
      getnewUsers();
    } else {
      dispatch(logout());
      navigate("/");
    }
  }, [status]);

  //function to logout if no token or token expired
  const userLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div>
      <div className="container mt-5">
        <div className="row">
          <div className="col col-12  col-lg-9  ">
            <div className="row">
              <div className="col   ">
                <UserDetails
                  users={users}
                  getAllUsers={getAllUsers}
                  getnewUsers={getnewUsers}
                />
              </div>
            </div>
          </div>
          <div className="col">
            <RoleMap
              users={newUsers}
              userLogout={userLogout}
              getAllUsers={getAllUsers}
              getnewUsers={getnewUsers}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuperAdminHome;
