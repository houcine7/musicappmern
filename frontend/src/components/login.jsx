import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { FcGoogle } from "react-icons/fc";

import { app } from "../config/firebase.config.js";

import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const Login = ({ loggedIn }) => {
  //init navigation
  const navigateTo = useNavigate();

  useEffect(() => {
    console.log(loggedIn);
    // go to home page when u already logged in
    loggedIn && navigateTo("/", { replace: true });
  }, [loggedIn]);

  // firebase authentication vars:
  const fireAuthentication = getAuth(app);
  const provider = new GoogleAuthProvider();

  //handel button click
  const handelClick = async () => {
    //
    try {
      const user = await signInWithPopup(fireAuthentication, provider);
      if (user) {
        localStorage.setItem(
          "loggedInUser",
          (await user.user.getIdToken()).toString()
        );
        navigateTo("/", { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="d-flex flex-column justify-content-center vh-100">
        <div className="d-flex justify-content-center">
          <button
            className="btn btn-outline btnCloring btn-lg d-flex align-items-center "
            style={{ width: "300px", zIndex: 99 }}
            onClick={handelClick}
          >
            <FcGoogle style={{ fontSize: "40px" }} />
            connect with google account
          </button>
        </div>
      </div>
      <img
        src="./my-svg.png"
        alt="loginsvg"
        className="position-absolute"
        style={{ height: "auto", bottom: "0%", width: "100%" }}
      />
    </>
  );
};

export default Login;
