import React from "react";
import icons from "./icons";
import logo from "../../images/navbarLogo2.png";

function Footer(props) {
  return (
    <footer
      className="justify-content-center"
      style={{
        backgroundColor: "#071330",
        alignItems: "center",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div>
        <div className="mt-5 mb-2" style={{ textAlign: "center" }}>
          <img src={logo} alt="logo" />
        </div>
        <h5
          className="mb-4 mt-2"
          style={{ textAlign: "center", color: "#C3CEDA", flex: "1" }}
        >
          Contact information of Makima collection
        </h5>
        <div className="row mx-3">
          <div className="col-1" style={{ width: "50px" }}>
            {icons.phone()}
          </div>
          <p className="col" style={{ color: "#C3CEDA" }}>
            12 34 56 78 021
          </p>
        </div>
        <div className="row ms-4">
          <div className="col-1" style={{ width: "50px" }}>
            {icons.email()}
          </div>
          <p className="col" style={{ color: "#C3CEDA" }}>
            makiama@gmail.com
          </p>
        </div>
        <div className="row ms-4">
          <div className="col-1" style={{ width: "50px" }}>
            {icons.instagram()}
          </div>
          <p className="col" style={{ color: "#C3CEDA" }}>
            instagram.com/makima
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
