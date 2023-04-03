import React from "react";
import TopNavbar from "../topNavbar/TopNavbar";
import { Outlet } from "react-router-dom";
import { userLogin } from "../../slices/loginSlice";
import { ToastContainer, toast } from "react-toastify";

function GdoRootLayout() {
  const notifyDanger = (msg) => {
    toast.error(msg);
  };
  const notifySuccess = (msg) => {
    toast.success(msg);
  };
  console.log("Gdo rootlayout render");
  return (
    <div>
      <ToastContainer />
      <TopNavbar type="gdo" />
      <div className="container ">
        <div className=" row mt-5">
          <Outlet notifyDanger={notifyDanger} notifySuccess={notifySuccess} />
        </div>
      </div>
    </div>
  );
}

export default GdoRootLayout;
