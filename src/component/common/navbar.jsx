import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import auth from "../../sevices/authService";
import logo from "../../images/navbarLogo.png";
import icons from "./icons";

function Navbar({ navItems }) {
  const navigate = useNavigate();

  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-dark"
        style={{ backgroundColor: "#071330" }}
      >
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <img
            src={logo}
            alt="Logo"
            height="50"
            width="90"
            className="d-inline-block align-text-top"
          />
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            {navItems.map((navItem) => (
              <div key={navItem.name} className="navbar-nav">
                <NavLink
                  style={{ color: "#C3CEDA" }}
                  className="nav-item nav-link"
                  to={navItem.link}
                >
                  {navItem.name}
                </NavLink>
              </div>
            ))}
          </div>
          <span
            style={{ color: "#C3CEDA", cursor: "pointer" }}
            onClick={() => {
              auth.logout();
              navigate("/");
            }}
          >
            {icons.door()}Exit
          </span>
        </div>
      </nav>
      <div></div>
    </div>
  );
}

export default Navbar;
