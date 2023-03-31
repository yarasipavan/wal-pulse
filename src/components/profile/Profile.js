import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../slices/loginSlice";
import { useNavigate } from "react-router-dom";
import dummyPic from "../../images/dummy_profile.jpg";

function Profile() {
  let { user } = useSelector((store) => store.login);
  let navigate = useNavigate();
  let dispatch = useDispatch();
  useEffect(() => {
    let token = localStorage.getItem("token");
    if (!token) {
      //logout totally
      dispatch(logout());
      navigate("/");
    }
  }, []);
  return (
    <div className="p-3">
      <h4 className="text-center ">Profile</h4>

      <div className="container mt-5   ">
        <div className="row ">
          <div className="col-12 col-md-10 col-lg-6 mx-auto">
            <div className="row row-cols-2 shadow p-3">
              <div className="col col-12 col-lg-4 ps-2">
                <img src={dummyPic} width={150} height={150} />
              </div>
              <div className="col col-12 col-lg-8 ps-2 ">
                <div className="row ">
                  <div className="col ps-3">{user.name.toUpperCase()}</div>
                </div>
                <hr></hr>
                <div className="row ">
                  <div className="col ps-3 ">
                    <span className="fw-bold">Employee Id: </span> {user.emp_id}
                  </div>
                </div>
                <div className="row ">
                  <div className="col ps-3 ">
                    <span className="fw-bold">Email: </span> {user.email}
                  </div>
                </div>
                <div className="row ">
                  <div className="col ps-3">
                    <span className="fw-bold">User Type: </span>
                    {user.user_type}
                  </div>
                </div>
                <div className="row ">
                  <div className="col ps-3">
                    <span className="fw-bold">Status: </span>
                    {user.status ? "Active" : "Inactive"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
