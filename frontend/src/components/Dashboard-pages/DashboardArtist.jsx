import React from "react";
import { useStateValue } from "../../context/contextProvider";

import { FiInstagram } from "react-icons/fi";

const DashboardArtist = () => {
  const [{ allArtists }, dispatch] = useStateValue();

  return (
    <div className="container d-flex justify-content-center position-relative">
      <table className="table table-striped table-responsive">
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
              <td>
                <img
                  src={artist.imageURL}
                  alt="artist"
                  referrerPolicy="no-referrer"
                  className="img-fluid rounded-circle"
                  style={{ width: "40px", height: "45px" }}
                />
              </td>
              <td>{artist.name}</td>
              <td>
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
