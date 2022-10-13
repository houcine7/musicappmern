import React, { useState } from "react";
import { filterLanguage, genderFilter } from "../../utils/filterOptions";
import AddSongFilter from "./AddSongFilter";
import { useStateValue } from "../../context/contextProvider";

import Loader from "react-js-loader";

//firebase imports
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";

import { database } from "../../config/firebase.config";
//cte
const initialState = {
  songName: "",
  artist: "",
  category: "",
  album: "",
  language: "",
  songURL: "",
  imageURL: "",
};
const AddSong = () => {
  const [{ allArtists, allAlbums }, dispatch] = useStateValue();
  const [formState, setFormStates] = useState(initialState);

  const handelChange = (e) => {
    setFormStates((prevForm) => {
      return {
        ...prevForm,
        [e.target.name]: e.target.value,
      };
    });
    console.log(formState);
  };

  return (
    <div className="container-fluid border ">
      <div className="row">
        <div className=" pb-5 col-lg-12">
          <form>
            <label htmlFor="songname mb-5">song name</label>
            <input
              type="text"
              className="form-control mb-3 mt-1"
              name="songName"
              id="songname"
              aria-describedby="helpId"
              placeholder="song name goes here"
              onChange={(e) => {
                handelChange(e);
              }}
            />
            <div className="d-flex justify-content-around flex-wrap">
              <AddSongFilter
                name={"language"}
                data={filterLanguage}
                handelChange={handelChange}
              />
              <AddSongFilter
                name={"category"}
                data={genderFilter}
                handelChange={handelChange}
              />
              <AddSongFilter
                name={"artist"}
                data={allArtists}
                handelChange={handelChange}
              />
              <AddSongFilter
                name={"album"}
                data={allAlbums}
                handelChange={handelChange}
              />
            </div>
            <div
              className="row justify-content-center"
              style={{ marginTop: "2rem" }}
            >
              <UploadForm name={"image"} />
              <UploadForm name={"song"} />
            </div>
          </form>
        </div>

        <div className="addleft d-flex flex-column justify-content-center col-lg-4">
          form2
        </div>
      </div>
    </div>
  );
};

export default AddSong;

// upload form

const UploadForm = ({ name, handelChange }) => {
  const [isLoading, setLoading] = useState(false);
  const [uploadedURL, setUploadedURL] = useState("");

  //upload file

  const uploadFile = (e) => {
    setLoading(true);
    const fileToUpload = e.target.files[0];
    //upload file to firebase
    const databaseRef = ref(
      database,
      name == "image"
        ? "images" + `/${Date.now()}-${fileToUpload.name}`
        : "audios" + `/${Date.now()}-${fileToUpload.name}`
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
          //download url
          setUploadedURL(downloadURL);
          setLoading(false);
        });
      }
    );
  };

  return (
    <div
      className="form-group col-md-6 mb-2 "
      style={{ position: "relative", height: "10rem" }}
    >
      <div
        className="input-group mb-3 px-2  bg-white shadow-sm"
        style={{ height: "100%", overflow: "hidden" }}
      >
        {isLoading && (
          <Loader type={"bubble-top"} bgColor={"#6dff63"} size={60} />
        )}
        {!isLoading && (
          <>
            <input
              name={name + "URL"}
              id={name}
              type="file"
              accept={name == "image" ? "image/*" : "audio/*"}
              className="form-control border"
              style={{ opacity: "0" }}
              required
              onChange={(e) => uploadFile(e)}
            />

            <label htmlFor={name} style={{ position: "absolute", top: "40%" }}>
              No {name} yet
            </label>
            <div className="input-group-append align-self-center">
              <label
                htmlFor={name}
                className="btn btn-light m-0 rounded-pill px-4 btn-upload "
              >
                <i className="bi bi-cloud-arrow-up-fill mr-2 text-muted"></i>
                <small className="text-uppercase font-weight-bold text-muted ">
                  Choose {name}
                </small>
              </label>
            </div>
          </>
        )}
        {uploadedURL != "" && (
          <>
            <img src={uploadedURL} alt="image" className="image-fluid" />
          </>
        )}
      </div>
    </div>
  );
};
