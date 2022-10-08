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
