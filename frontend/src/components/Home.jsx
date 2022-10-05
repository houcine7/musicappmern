import React from "react";
import Nav from "./Nav";
import Hero from "./Hero";

const Home = ({ setLoggedIn }) => {
  return (
    <>
      <div className="position-relative">
        <Nav setLoggedIn={setLoggedIn} />
      </div>

      <Hero />
    </>
  );
};

export default Home;
