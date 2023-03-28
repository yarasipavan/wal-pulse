import { useContext } from "react";
import "./PublicRootLayout.css";
import logoImg from "../../images/logo.png";
import { Link, Outlet } from "react-router-dom";

function PublicRootLayout() {
  return (
    <div>
      <div className="container m-0 p-0">
        <div className=" row " style={{ width: "100vw" }}>
          <div className="d-none d-md-block col-md-6 col-lg-8 login-image-col "></div>
          <div className="col-12 col-sm-10 col-md-6 col-lg-4 mx-auto mt-4 ">
            <div style={{ width: "75%" }} className="mx-auto">
              <img src={logoImg} width={"80px"} className="mb-3" />
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PublicRootLayout;
