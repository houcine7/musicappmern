import React, { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { useStateValue } from "../../context/contextProvider";

import { addAlbum, deleteAlbum } from "../../api";

// firebase imports
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

import { database } from "../../config/firebase.config";

// cte
const initialState = {
  imageURL: "",
  name: "",
  songsNumber: "",
};

//

const DashboardAlbums = () => {
  const [{ allAlbums }, dispatch] = useStateValue(initialState);
  const [formStates, setFormStates] = useState();

  // get input fields info

  const handelChange = (e) => {
    //
    setFormStates((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
    console.log(formStates);
  };

  // upload album image to firebase database function :
  const uploadImage = (e) => {
    const fileToUpload = e.target.files[0];
    const databaseRef = ref(
      database,
      "images" + `/${Date.now()}-${fileToUpload.name}`
    );

    const uploadTask = uploadBytesResumable(databaseRef, fileToUpload);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        //upload progress here
        const progress = snapshot.bytesTransferred / snapshot.totalBytes;
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          //upload url
          setFormStates((prevState) => {
            return {
              ...prevState,
              imageURL: downloadURL,
            };
          });
          console.log(formStates);
        });
      }
    );
  };

  const handelAddAlbum = () => {
    //saving album to mongodb
    const result = addAlbum(formStates);
    console.log(result);
  };

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
                  id={item._id}
                />
              );
            })}
          </div>
        </div>
      </div>

      <div className="addAlbum container pt-5 pb-5 mt-5">
        <h3 className="title pb-2">Add album</h3>
        <form>
          <div className="row pb-3">
            <div className="col-lg-4">
              <label className="form-label" htmlFor="albumImage">
                Album image
              </label>
              <input
                type="file"
                className="form-control"
                id="albumImage"
                required
                onChange={(e) => uploadImage(e)}
              />
            </div>
            <div className="col-lg-4">
              <label htmlFor="albumName" className="form-label">
                Album Name
              </label>
              <input
                id="albumName"
                className="form-control"
                name="name"
                type="text"
                placeholder="name album"
                required
                onChange={(e) => handelChange(e)}
              />
            </div>
            <div className="col-lg-4">
              <label htmlFor="songsNumber" className="form-label">
                Songs Number
              </label>
              <input
                id="songsNumber"
                name="songsNumber"
                className="form-control"
                type="number"
                placeholder="Songs number"
                required
                onChange={(e) => handelChange(e)}
              />
            </div>
          </div>
          <button className="btn btn-primary" onClick={handelAddAlbum}>
            Add Album
          </button>
        </form>
      </div>
    </>
  );
};

const AlbumsCard = ({ name, imageURL, songsNumber, id }) => {
  //
  return (
    <div
      className="card text-left"
      style={{
        width: "245px",
        borderRadius: "15px",
        height: "294px",
        overflow: "hidden",
      }}
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
          className="delete-icon"
          onClick={() => {
            deleteAlbum(id);
            window.location.reload();
          }}
        />
      </div>
    </div>
  );
};

export default DashboardAlbums;
