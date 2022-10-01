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
//
function App() {
  //to track user sign in state
  const authentication = getAuth(app);
  const navigateTo = useNavigate();
  //
  const [loggedIn, setLoggedIn] = useState(false);

  // limit access to login page
  useEffect(() => {
    const userToken = localStorage.getItem("loggedInUser");
    console.log(userToken);
    valideUser(userToken).then((res) => {
      console.log(res);
    });
    if (userToken !== null) {
      setLoggedIn(true);
    } else {
      navigateTo("/login", { replace: true });
    }
  }, []);
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
            <Home />
          </>
        }
      />
    </Routes>
  );
}

export default App;
