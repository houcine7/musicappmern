import React from "react";
import Nav from "./Nav";
import { AiFillHome } from "react-icons/ai";

import DashboardLinks from "./DashboardLinks";
import { Route, Routes } from "react-router-dom";
import DashBoardHome from "./Dashboard-pages/DashBoardHome";
import DashboardUsers from "./Dashboard-pages/DashboardUsers";
import DashboardSongs from "./Dashboard-pages/DashboardSongs";
import DashboardArtist from "./Dashboard-pages/DashboardArtist";
import DashboardAlbums from "./Dashboard-pages/DashboardAlbums";
const constant = [
  <AiFillHome style={{ fontSize: "40px" }} />,
  "Users",
  "Songs",
  "Albums",
  "Artists",
];
const DashBoard = () => {
  return (
    <div className="position-relative dashboard-links">
      <Nav />
      <div className="container nav-dash d-flex justify-content-evenly align-items-center ">
        {constant.map((item, index) => (
          <DashboardLinks children={item} key={index} index={index} />
        ))}
      </div>
      <div className="pt-5">
        <Routes>
          <Route path="/home" element={<DashBoardHome />} />
          <Route path="/users" element={<DashboardUsers />} />
          <Route path="/songs" element={<DashboardSongs />} />
          <Route path="/artists" element={<DashboardArtist />} />
          <Route path="/albums" element={<DashboardAlbums />} />
        </Routes>
      </div>
    </div>
  );
};

export default DashBoard;
