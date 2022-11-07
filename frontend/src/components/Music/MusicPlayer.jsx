import React, { useEffect } from "react";
import { useStateValue } from "../../context/contextProvider";

import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

import { TbPlaylist } from "react-icons/tb";

import { FcMusic } from "react-icons/fc";
import { Fade } from "react-awesome-reveal";

export const MusicPlayer = () => {
  const [
    { allSongs, allArtists, allAlbums, playListIsDisplaying, currentSong },
    dispatch,
  ] = useStateValue();

  useEffect(() => {
    if (currentSong == null) {
      dispatch({
        type: "SET_CUERRENT_SONG",
        currentSong: allSongs[0],
      });
    }
  });

  const handelClick = () => {
    //show or hide playlist
    if (playListIsDisplaying == false) {
      dispatch({
        type: "SET_PLAYLIST_IS_DISPLAYING",
        playListIsDisplaying: true,
      });
    } else {
      dispatch({
        type: "SET_PLAYLIST_IS_DISPLAYING",
        playListIsDisplaying: false,
      });
    }
  };
  return (
    <div className="container-fluid d-flex justify-content-center">
      <div className="w-100 position-relative d-flex justify-content-center">
        <img
          src={currentSong?.imageURL}
          className="img-fluid rounded"
          alt="song cover image"
          style={{ maxWidth: "90px" }}
        />
        <div
          className="d-flex flex-column justify-content-center"
          style={{ marginLeft: "1rem", marginRight: "1rem" }}
        >
          <b className="pl-2">
            {currentSong?.name}({currentSong?.category[0]})
          </b>
          <p className="artist name" style={{ margin: "0" }}>
            {allArtists?.map((artist) => {
              if (currentSong?.artist == artist._id) return artist.name;
            })}{" "}
            <span className="album">
              {allAlbums?.map((album) => {
                if (currentSong?.album == album._id) return album.name;
              })}
            </span>
          </p>
          <TbPlaylist
            style={{
              fontSize: "30px",
              color: "#6dff63",
              fontWeight: "600",
              cursor: "pointer",
            }}
            className="playlist-icon"
            onClick={handelClick}
          />
        </div>
        <div className="flex-1 flex-grow-1 justify-content-center">
          <AudioPlayer
            src={currentSong?.songURL}
            onPlay={() => console.log("playing ...")}
            autoPlay={false}
            showSkipControls={true}
            /*onClickNext ={}
            onClickPrevious ={}
          */
            style={{ height: "100%", width: "100%" }}
          />
        </div>
      </div>
    </div>
  );
};

export const PlayListCards = () => {
  const [{ allSongs }, dispatch] = useStateValue();

  return (
    <Fade>
      <div
        className="position-fixed playlist-card border"
        style={{
          zIndex: "3",
          bottom: "92px",
          left: "40px",
          width: "300px",
          height: "60%",
        }}
      >
        <div className="p-2 w-100 d-flex flex-column gap-3">
          {allSongs?.map((song) => {
            return <PlayListSongCard song={song} />;
          })}
        </div>
      </div>
    </Fade>
  );
};

const PlayListSongCard = ({ song }) => {
  const [{ allArtists, currentSong }, dispatch] = useStateValue();

  const changePlyingSong = () => {
    dispatch({
      type: "SET_CUERRENT_SONG",
      currentSong: song,
    });
  };
  return (
    <Fade direction="left">
      <div
        className="container d-flex gap-1 song-card"
        style={
          song._id == currentSong._id
            ? { transition: "0.1s", background: "#28f1ff" }
            : { transition: "0.1s" }
        }
        onClick={changePlyingSong}
      >
        <div className="card-icon">
          <FcMusic style={{ fontSize: "30px", color: "black" }} />
        </div>
        <div className="d-flex flex-column">
          <b className="text-bold">
            {song?.name}({song?.category})
          </b>
          <p>
            {allArtists?.map((artist) => {
              if (artist._id == song.artist) return artist.name;
            })}
          </p>
        </div>
      </div>
    </Fade>
  );
};
