import axios from "axios";

//api url

const apiURL = "http://localhost:8000/";

//authorize user
export const valideUser = async (token) => {
  //make api request
  try {
    const res = await axios.get(apiURL + "api/users/login", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    return res.data;
  } catch (error) {
    console.log("error: " + error);
  }
};

// fetch all users form api

export const getUsers = async () => {
  try {
    const result = await axios.get(apiURL + "api/users/getAllUsers");
    return result.data.data;
  } catch (error) {
    console.log(error.message);
    return;
  }
};

// delete a user from db
export const deleteUser = async (idUser) => {
  try {
    const result = await axios.delete(
      apiURL + "api/users/deleteUser/" + idUser
    );
    return result.data.msg;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

// update a user role
export const updateUserRole = async (id, role) => {
  //
  try {
    const result = await axios.put(apiURL + "api/users/userRole/" + id, {
      role: role,
    });
    return result.data.msg;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

// fetchall songs from api

export const getSongs = async () => {
  try {
    const result = await axios.get(apiURL + "api/songs/getAll");
    console.log(result);
    return result.data.data;
  } catch (error) {
    console.log(error.message);
    return;
  }
};

//fetch all albums from api

export const getAlbums = async () => {
  try {
    const result = await axios.get(apiURL + "api/albums/getAll");
    return result.data.data;
  } catch (error) {
    console.log(error.message);
    return;
  }
};

// fetch all artists from api

export const getArtists = async () => {
  //
  try {
    const result = await axios.get(apiURL + "api/artists/getAll");
    return result.data.data;
  } catch (error) {
    console.log(error.message);
    return;
  }
};

// save song to db

export const saveSong = async (data) => {
  //
  try {
    const result = await axios.post(apiURL + "api/songs/addSong", data);
    return result.data.msg;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

// delete song function

export const deleteSong = async (id) => {
  try {
    const result = await axios.delete(apiURL + "api/songs/deleteSong/" + id);
    return result.data.msg;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

// add album to db

export const addAlbum = async (data) => {
  //
  try {
    const result = await axios.post(apiURL + "api/albums/addAlbum", data);
    return result.data.response;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};

//
export const deleteAlbum = async (id) => {
  try {
    const result = await axios.delete(apiURL + "api/albums/deleteAlbum/" + id);
    return result.data.response;
  } catch (error) {
    console.log(error.message);
    return null;
  }
};
