import React, { useCallback } from "react";

import { getAudioDurationInSeconds } from "@remotion/media-utils";
import { useStateValue } from "../context/contextProvider";
import { useEffect } from "react";

const SongsByCategory = () => {
  const [{ allSongs, allAlbums, allArtists, currentSong }, dispatch] =
    useStateValue();

  const getSongDuration = async (URL) => {
    const result = await getAudioDurationInSeconds(URL);
    return "" + result + "";
  };

  useEffect(() => {
    const updateSongs = async () => {
      let newAllSongs = [];

      for (let i = 0; i < allSongs.length; i++) {
        const duration = await getSongDuration(allSongs[i].songURL);
        const newSongWithTime = {
          ...allSongs[i],
          duration: duration,
        };
        newAllSongs.push(newSongWithTime);
      }
      dispatch({
        type: "SET_ALL_SONGS",
        allSongs: newAllSongs,
      });
    };
    updateSongs();
  }, []);

  const handelClick = (song) => {
    //
    dispatch({
      type: "SET_CUERRENT_SONG",
      currentSong: song,
    });
  };
  return (
    <section className="pt-7 pb-7 container" style={{ padding: "5.5rem 0" }}>
      <div
        className="w-100 position-relative h-10"
        style={{
          backgroundImage: `url(${"../../bg2.png"})`,
          height: "115px",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      <div className="table-responsive position-relative">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Title</th>
              <th>Album</th>
              <th>duration</th>
            </tr>
          </thead>
          <tbody>
            {allSongs != [] &&
              allSongs.map((song, index) => {
                //
                return (
                  <tr
                    key={index}
                    className="pointer"
                    onClick={() => handelClick(song)}
                  >
                    <td>
                      <div className="d-flex gap-2 align-items-center ">
                        <p>{index + 1}</p>
                        <div className="d-flex align-items-center gap-2">
                          <img
                            className="img-fluid rounded"
                            src={song.imageURL}
                            alt="song IMG"
                            style={{ width: "55px", height: "55px" }}
                          />
                          <div className="d-flex flex-column align-items-center">
                            <b className="songName">{song.name}</b>
                            <p className="artistName">
                              {" "}
                              {allArtists?.map((artist) => {
                                if (artist._id === song.artist)
                                  return artist.name;
                              })}
                            </p>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p>
                        {allAlbums?.map((album) => {
                          if (album._id === song.album) return album.name;
                        })}
                      </p>
                    </td>
                    <td>
                      {song.duration
                        ? (song.duration / 60).toString().split(".")[0] +
                          " : " +
                          (song.duration / 60)
                            .toString()
                            .split(".")[1]
                            .slice(0, 2)
                        : "..."}
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default SongsByCategory;
