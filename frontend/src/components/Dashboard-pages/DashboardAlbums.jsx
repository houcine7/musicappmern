import React from "react";
import { MdDeleteForever } from "react-icons/md";
import { useStateValue } from "../../context/contextProvider";

const DashboardAlbums = () => {
  const [{ allAlbums }, dispatch] = useStateValue();
  return (
    <>
      <div className="container pt-3"></div>
      <div className="container mt-5 border">
        <div className="p-3">
          <p>
            Albums Number :
            <span className="text-bold">
              <strong>{allAlbums?.length}</strong>
            </span>
          </p>
          <div className="d-flex flex-wrap justify-content-around align-items-center ">
            {allAlbums?.map((item, index) => {
              return (
                <AlbumsCard
                  key={index}
                  name={item.name}
                  imageURL={item.imageURL}
                  songsNumber={item.songsNumber}
                />
              );
            })}
          </div>
        </div>
      </div>

      <div className="addAlbum container pt-5 pb-5 mt-3">
        <h3 className="title pb-2">Add album</h3>
        <form>
          <div className="row pb-3">
            <div className="col-lg-4">
              <label className="form-label" htmlFor="albumImage">
                Album image
              </label>
              <input type="file" className="form-control" id="albumImage" />
            </div>
            <div className="col-lg-4">
              <label htmlFor="albumName" className="form-label">
                Album Name
              </label>
              <input
                id="albumName"
                className="form-control"
                type="text"
                placeholder="name album"
              />
            </div>
            <div className="col-lg-4">
              <label htmlFor="songsNumber" className="form-label">
                Songs Number
              </label>
              <input
                id="songsNumber"
                className="form-control"
                type="number"
                placeholder="name album"
              />
            </div>
          </div>
          <button className="btn btn-primary">Add Album</button>
        </form>
      </div>
    </>
  );
};

const AlbumsCard = ({ name, imageURL, songsNumber }) => {
  //
  return (
    <div
      className="card text-left"
      style={{ width: "230px", borderRadius: "15px" }}
    >
      <img
        className="image-fluid"
        src={imageURL}
        alt="album image"
        style={{ height: "200px", borderRadius: "15px" }}
      />
      <div className="d-flex w-100 p-3 justify-content-evenly">
        <div>
          <h4 className="card-title">{name}</h4>
          <p className="card-text">
            songs:{" "}
            <span>
              <strong> {songsNumber}</strong>
            </span>
          </p>
        </div>
        <MdDeleteForever
          style={{ fontSize: "30px", cursor: "pointer", color: "red" }}
        />
      </div>
    </div>
  );
};

export default DashboardAlbums;
