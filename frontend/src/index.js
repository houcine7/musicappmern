import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

import { StateProvider } from "./context/contextProvider";
import reducer from "./context/reducer";
import { initialState } from "./context/initialstate";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <StateProvider reducer={reducer} initialState={initialState}>
        <App />
      </StateProvider>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
