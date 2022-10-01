import React from "react";
import Nav from "./Nav";
import Hero from "./Hero";

const Home = () => {
  return (
    <>
      <div className="position-relative">
        <Nav />
      </div>

      <Hero />
    </>
  );
};

export default Home;
