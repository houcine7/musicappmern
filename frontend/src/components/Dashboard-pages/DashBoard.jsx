import React from "react";
import Nav from "../Nav";
import { AiFillHome } from "react-icons/ai";

import DashboardLinks from "./DashboardLinks";
import { Route, Routes } from "react-router-dom";
import DashBoardHome from "./DashBoardHome";
import DashboardUsers from "./DashboardUsers";
import DashboardSongs from "./DashboardSongs";
import DashboardArtist from "./DashboardArtist";
import DashboardAlbums from "./DashboardAlbums";
import AddSong from "./AddSong";
import { useStateValue } from "../../context/contextProvider";
import { useEffect } from "react";
import { CardsContent } from "../../data/CardsDashboardData";

import { getSongs, getUsers, getAlbums, getArtists } from "../../api/index";
const constant = [
  <AiFillHome style={{ fontSize: "40px" }} />,
  "Users",
  "Songs",
  "Albums",
  "Artists",
];
const DashBoard = () => {
  const [{ user, allUsers, allSongs, allAlbums, allArtists }, dispatch] =
    useStateValue();

  useEffect(() => {
    const fetchData = async () => {
      if (allUsers == null) {
        const data = await getUsers().then((users) => users);
        CardsContent[3].states = data.length;
        dispatch({
          type: "SET_ALL_USERS",
          allUsers: data,
        });
      }
      if (allSongs == null) {
        const data = await getSongs().then((users) => users);
        CardsContent[2].states = data.length;
        dispatch({
          type: "SET_ALL_SONGS",
          allSongs: data,
        });
      }
      if (allAlbums == null) {
        const data = await getAlbums().then((users) => users);
        CardsContent[0].states = data.length;
        dispatch({
          type: "SET_ALL_ALBUMS",
          allAlbums: data,
        });
      }
      if (allArtists == null) {
        const data = await getArtists().then((users) => users);
        CardsContent[1].states = data.length;
        dispatch({
          type: "SET_ALL_ARTISTS",
          allArtists: data,
        });
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <div className="position-relative dashboard-links">
        <Nav />
        <div className="container nav-dash d-flex justify-content-evenly align-items-center ">
          {constant.map((item, index) => (
            <DashboardLinks children={item} key={index} index={index} />
          ))}
        </div>
      </div>
      {user?.role === "admin" && (
        <div className="pt-5">
          <Routes>
            <Route path="/home" element={<DashBoardHome />} />
            <Route path="/users" element={<DashboardUsers />} />
            <Route path="/songs" element={<DashboardSongs />} />
            <Route path="/artists" element={<DashboardArtist />} />
            <Route path="/albums" element={<DashboardAlbums />} />
            <Route path="songs/addsong" element={<AddSong />} />
          </Routes>
        </div>
      )}
    </>
  );
};

export default DashBoard;
