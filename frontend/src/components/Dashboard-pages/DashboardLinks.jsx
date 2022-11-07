import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const DashboardLinks = ({ children, index }) => {
  let link;
  let active = "";
  switch (index) {
    case 0:
      link = "home";
      active = "active";
      break;
    case 1:
      link = "users";
      break;
    case 2:
      link = "songs";
      break;
    case 3:
      link = "albums";
      break;
    case 4:
      link = "artists";
      break;
  }
  const handelClick = (e) => {
    //
    document.querySelector(".active")?.classList.remove("active");
    e.target.classList.remove("linkDashboard");
    e.target.classList.add("active");
  };

  return (
    <div>
      <NavLink
        to={"/dashboard/" + link}
        className={" mylink linkDashboard"}
        style={{ fontWeight: "900" }}
        onClick={handelClick}
      >
        {children}
      </NavLink>
    </div>
  );
};

export default DashboardLinks;
