import React from "react";
import { NavLink } from "react-router-dom";

const CategoryCards = ({ card }) => {
  return (
    <NavLink
      to={"/home/categorys/pop"}
      style={{ color: "black", textDecoration: "none" }}
    >
      <div
        className="card category-card align-items-center"
        style={{ width: "150px", height: "190px" }}
      >
        <div className="card-img imgCategorycontainer">
          <img
            className="img-fluid img-rounded category-icon"
            src={card.image}
            alt="category picture"
            style={{ height: "120px", width: "100%", opacity: "0.9" }}
          />
        </div>
        <div className="card-body text-center ">
          <b className="category-name">{card.name}</b>
        </div>
      </div>
    </NavLink>
  );
};

export default CategoryCards;
