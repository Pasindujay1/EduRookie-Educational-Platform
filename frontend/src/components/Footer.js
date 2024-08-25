import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";

//footer functional component
const Footer = () => {
  //Render the footer component
  return (
    <div
      className=" bg-light w-100 shadow-lg "
      style={{
        fontFamily: "poppins",
        position: "fixed",
        bottom: "0",
        width: "100%",
      }}
    >
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-0 border-top px-2">
        <div className="col-md-4 d-flex align-items-center">
          <span className="mb-3 mb-md-0 text-body-secondary">
            &copy; 2024 PACH Tech. All rights reserved.
          </span>
        </div>

        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
          <li className="ms-3">
            <a className="text-body-secondary" href="#">
              <TwitterIcon />
            </a>
          </li>
          <li className="ms-3">
            <a className="text-body-secondary" href="#">
              <InstagramIcon />
            </a>
          </li>
          <li className="ms-3">
            <a className="text-body-secondary" href="#">
              <FacebookIcon />
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
};

// Export the Footer component as the default export
export default Footer;
