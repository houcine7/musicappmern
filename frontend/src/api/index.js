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
    console.log(res);
    return res.data;
  } catch (error) {
    return null;
  }
};
