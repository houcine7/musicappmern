import React from "react";
import { useStateValue } from "../../context/contextProvider";

import { FiInstagram } from "react-icons/fi";

const DashboardArtist = () => {
  const [{ allArtists }, dispatch] = useStateValue();

  return (
    <div className="container d-flex justify-content-center position-relativ table-responsive">
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Image</th>
            <th scope="col">Name</th>
            <th scope="col">Instagram</th>
          </tr>
        </thead>
        <tbody>
          {allArtists?.map((artist, index) => (
            <tr key={index}>
              <td colSpan="1">
                <img
                  src={artist.imageURL}
                  alt="artist"
                  referrerPolicy="no-referrer"
                  className="img-fluid rounded-circle"
                  style={{ width: "40px", height: "45px" }}
                />
              </td>
              <td colSpan="1">{artist.name}</td>
              <td colSpan="1">
                <a href={artist.instagram}>
                  <span>
                    <FiInstagram style={{ fontSize: "35px" }} />
                  </span>
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardArtist;
