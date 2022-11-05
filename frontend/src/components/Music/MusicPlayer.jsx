import React from "react";
import { useStateValue } from "../../context/contextProvider";

import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

import { TbPlaylist } from "react-icons/tb";
const MusicPlayer = ({ song }) => {
  const [{ allSongs, allArtists, allAlbums }, dispatch] = useStateValue();

  return (
    <div className="container-fluid d-flex justify-content-center">
      <div className="w-100 position-relative d-flex justify-content-center">
        <img
          src={song.imageURL}
          className="img-fluid rounded"
          alt="song cover image"
          style={{ maxWidth: "90px" }}
        />
        <div
          className="d-flex flex-column justify-content-center"
          style={{ marginLeft: "1rem", marginRight: "1rem" }}
        >
          <b className="pl-2">
            {song.name}({song.category[0]})
          </b>
          <p className="artist name" style={{ margin: "0" }}>
            {allArtists?.map((artist) => {
              if (song.artist == artist._id) return artist.name;
            })}{" "}
            <span className="album">
              {allAlbums?.map((album) => {
                if (song.album == album._id) return album.name;
              })}
            </span>
          </p>
          <TbPlaylist
            style={{ fontSize: "30px", color: "#6dff63", fontWeight: "600" }}
          />
        </div>
        <div className="flex-1 flex-grow-1 justify-content-center">
          <AudioPlayer
            src={song.songURL}
            onPlay={() => console.log("playing ...")}
            autoPlay={true}
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

export default MusicPlayer;
