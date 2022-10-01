import React from "react";
import { FcMusic } from "react-icons/fc";
import { ImHeadphones } from "react-icons/im";

const Hero = () => {
  return (
    <section className="container hero">
      <div className="d-flex justify-content-md-around align-items-center flex-wrap">
        <div className="d-flex flex-column justify-content-center">
          <h1>
            Home of <span className="hook">MUSIC</span>
            <FcMusic style={{ fontSize: "40px" }} />
          </h1>
          <strong className="mt-3 slogan text-center">
            Let the music take you away.{" "}
            <ImHeadphones style={{ fontSize: "40px", color: "white" }} />
          </strong>
        </div>
        <div className="d-flex flex-column justify-content-center">
          <img src="./Playlist.gif" alt="hero img" className="img-fluid" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
