import React, { useEffect } from "react";
import Nav from "./Nav";
import Hero from "./Hero";
import { MusicPlayer, PlayListCards } from "./Music/MusicPlayer";

import { useStateValue } from "../context/contextProvider";

import { getSongs, getArtists, getAlbums } from "../api";
import { Fade } from "react-awesome-reveal";

const Home = ({ setLoggedIn }) => {
  const [{ allSongs, allAlbums, allArtists, playListIsDisplaying }, dispatch] =
    useStateValue();

  //
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

  const hidePlayListOnClick = () => {
    if (playListIsDisplaying == true) {
      dispatch({
        type: "SET_PLAYLIST_IS_DISPLAYING",
        playListIsDisplaying: false,
      });
    }
  };

  return (
    <div onClick={hidePlayListOnClick}>
      <div className="position-relative">
        <Nav setLoggedIn={setLoggedIn} />
      </div>
      <Hero />
      <div className="position-relative pb-7">
        {allSongs != null && (
          <div
            className="position-fixed bottom-0  bg-whitesmoke border"
            style={{ left: "0", right: "0" }}
          >
            <div></div>
            <Fade direction="up">
              <MusicPlayer />
            </Fade>
          </div>
        )}
        {playListIsDisplaying && <PlayListCards />}
      </div>
    </div>
  );
};

export default Home;
