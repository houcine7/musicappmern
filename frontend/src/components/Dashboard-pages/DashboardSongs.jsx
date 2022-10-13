import React, { useState, useEffect } from "react";
import { SiAddthis } from "react-icons/si";
import { MdDeleteForever } from "react-icons/md";

import { useStateValue } from "../../context/contextProvider";
import { NavLink } from "react-router-dom";

const DashboardSongs = () => {
  const [{ allSongs, allArtists }, dispatch] = useStateValue();
  const [filterSongs, setFilter] = useState("");

  useEffect(() => {
    const songsToShow = "";
  }, [filterSongs]);
  return (
    <>
      <div className="container pt-3">
        <div className="d-flex justify-content-center align-items-center gap-5 ">
          <strong>
            <NavLink to={"./addsong"}>
              <SiAddthis style={{ fontSize: "30px", cursor: "pointer" }} />
            </NavLink>
          </strong>
          <input
            type="text"
            className="form-control searchfield"
            placeholder="Search song"
            style={{ width: "30%" }}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
      </div>
      <div className="container mt-5 border">
        <div className="p-3">
          <p>
            Songs Number :{" "}
            <span className="text-bold">
              <strong>{allSongs?.length}</strong>
            </span>
          </p>
          <div className="d-flex flex-wrap justify-content-around align-items-center ">
            {allSongs?.map((song, index) => (
              <SongsCard
                key={index}
                name={song.name}
                image={song.imageURL}
                artist={allArtists.map((artist) => {
                  if (artist._id === song.artist) {
                    return artist.name;
                  }
                })}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

const SongsCard = ({ image, name, artist }) => {
  return (
    <div
      className="card text-left align-items-center mb-3"
      style={{ maxWidth: "200px", borderRadius: "15px" }}
    >
      <img className="card-img-top" src={image} alt="imgsong" />

      <div className="w-100 d-flex justify-content-between align-items-center p-3">
        <div>
          <h4 className="card-title">{name}</h4>
          <p className="card-text">{artist}</p>
        </div>
        <MdDeleteForever
          style={{ fontSize: "30px", cursor: "pointer", color: "red" }}
        />
      </div>
    </div>
  );
};

export default DashboardSongs;
