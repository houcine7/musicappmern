import React, { useEffect } from "react";
import Nav from "./Nav";
import Hero from "./Hero";
import MusicPlayer from "./Music/MusicPlayer";
import { useStateValue } from "../context/contextProvider";

import { getSongs, getArtists, getAlbums } from "../api";
const Home = ({ setLoggedIn }) => {
  const [{ allSongs, allAlbums, allArtists }, dispatch] = useStateValue();

  useEffect(() => {
    const fetchData = async () => {
      if (allSongs == null) {
        const data = await getSongs().then((songs) => songs);
        dispatch({
          type: "SET_ALL_SONGS",
          allSongs: data,
        });
      }
      if (allAlbums == null) {
        const data = await getAlbums().then((albums) => albums);
        dispatch({
          type: "SET_ALL_ALBUMS",
          allAlbums: data,
        });
      }
      if (allArtists == null) {
        const data = await getArtists().then((albums) => albums);
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
      <div className="position-relative">
        <Nav setLoggedIn={setLoggedIn} />
      </div>
      <div className="position-relative">
        <Hero />
        {allSongs != null && (
          <div
            className="position-absolute bottom-0  bg-whitesmoke border"
            style={{ left: "0", right: "0" }}
          >
            <MusicPlayer song={allSongs[0]} />
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
