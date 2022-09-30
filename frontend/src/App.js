import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.scss";
import Login from "./components/login";

// firebase imports
import { app } from "./config/firebase.config";
import { getAuth } from "firebase/auth";

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
    </Routes>
  );
}

export default App;
