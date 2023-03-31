import React, { memo } from "react";
import { NavItem } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout } from "../../slices/loginSlice";

function TopNavbar({ type }) {
  let { user } = useSelector((store) => store.login);
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const logoutUser = () => {
    dispatch(logout());
    navigate("/");
  };
  const home = () => {
    navigate(`/${type}`);
  };

  const profile = () => {
    navigate("profile");
  };

  return (
    <Navbar
      sticky="top"
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      className="ps-3"
    >
      <Navbar.Brand href="#home">
        <img
          src="https://www.westagilelabs.com/wp-content/themes/west-agile-labs/assets/wal-logo.svg"
          width={"20px"}
        />
      </Navbar.Brand>
      <Navbar.Brand href="#home">WAL Pulse</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto"></Nav>
        <Nav>
          <Nav.Link onClick={home}>Home</Nav.Link>
          <NavDropdown title={user.email} id="collasible-nav-dropdown">
            <NavDropdown.Item onClick={profile}>profile</NavDropdown.Item>
            <NavDropdown.Item onClick={logoutUser} to="/">
              logout
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default memo(TopNavbar);
