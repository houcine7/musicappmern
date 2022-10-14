import React, { useState } from "react";
import { filterLanguage, genderFilter } from "../../utils/filterOptions";
import AddSongFilter from "./AddSongFilter";
import { useStateValue } from "../../context/contextProvider";

import Loader from "react-js-loader";
import { MdDeleteForever } from "react-icons/md";

//firebase imports
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";

import { database } from "../../config/firebase.config";

//api method
import { saveSong } from "../../api";
//cte
const initialState = {
  name: "",
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
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handelChange = (e) => {
    setFormStates((prevForm) => {
      return {
        ...prevForm,
        [e.target.name]: e.target.value,
      };
    });
  };
  const handelSubmit = (e) => {
    //
    e.preventDefault();
    saveSong(formState).then((result) => {
      //
      setFormSubmitted(false);
      setFormStates(initialState);
    });

    setFormSubmitted(true);
  };

  return (
    <div className="container-fluid border ">
      <div className="row">
        <div className=" pb-5 col-lg-12">
          <form onSubmit={(e) => handelSubmit(e)}>
            <label htmlFor="name mb-5">song name</label>
            <input
              type="text"
              className="form-control mb-3 mt-1"
              name="name"
              id="name"
              required
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
              <UploadForm name={"image"} handelChange={setFormStates} />
              <UploadForm name={"song"} handelChange={setFormStates} />
            </div>
            <div className="d-flex justify-content-end">
              <button className="btn btn-primary btn-lg">
                {formSubmitted && (
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                )}
                {formSubmitted ? "Adding song ..." : "Add song"}
              </button>
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
          if (name === "image") {
            handelChange((prevState) => {
              return {
                ...prevState,
                imageURL: downloadURL,
              };
            });
          } else {
            handelChange((prevState) => {
              return {
                ...prevState,
                songURL: downloadURL,
              };
            });
          }
          setLoading(false);
        });
      }
    );
  };

  // delete image

  const deleteImage = () => {
    setLoading(true);
    const deleteReference = ref(database, uploadedURL);
    deleteObject(deleteReference).then(() => {
      setLoading(false);
      setUploadedURL("");
    });
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
        {!isLoading && uploadedURL == "" && (
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
          <div className="d-flex justify-content-evenly align-items-center">
            {name == "image" ? (
              <img
                src={uploadedURL}
                alt="image"
                className="image-fluid"
                style={{ maxWidth: "50%" }}
              />
            ) : (
              <audio
                src={uploadedURL}
                controls
                className="audio-fluid audio"
              ></audio>
            )}

            <MdDeleteForever
              style={{ fontSize: "40px", cursor: "pointer", color: "red" }}
              onClick={deleteImage}
            />
          </div>
        )}
      </div>
    </div>
  );
};
