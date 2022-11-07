import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.scss";
import Login from "./components/login";
import Home from "./components/Home";
// firebase imports
import { app } from "./config/firebase.config";
import { getAuth } from "firebase/auth";

//api imports
import { valideUser } from "./api";
//context
import { useStateValue } from "./context/contextProvider";
import DashBoard from "./components/Dashboard-pages/DashBoard";
function App() {
  //to track user sign in state
  const authentication = getAuth(app);
  const navigateTo = useNavigate();
  //
  const [loggedIn, setLoggedIn] = useState(false);
  //context
  const [{ user }, dispatch] = useStateValue();

  // limit access to login page
  useEffect(() => {
    const userToken = localStorage.getItem("loggedInUser") || null;
    if (userToken !== null) {
      setLoggedIn(true);
      authentication.onAuthStateChanged((userInfo) => {
        if (userInfo) {
          userInfo.getIdToken().then((token) => {
            valideUser(token).then((data) => {
              dispatch({
                type: "SET_USER",
                user: data.msg,
              });
            });
          });
        }
      });
    } else {
      setLoggedIn(false);
      dispatch({
        type: "SET_USER",
        user: null,
      });
      navigateTo("/login", { replace: true });
    }
  }, [loggedIn]);
  //
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <>
            <Login loggedIn={loggedIn} />
          </>
        }
      />
      <Route
        path="/"
        element={
          <>
            <Home setLoggedIn={setLoggedIn} />
          </>
        }
      />
      <Route path="/dashboard/*" element={<DashBoard />} />
    </Routes>
  );
}

export default App;
