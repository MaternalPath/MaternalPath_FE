import React from "react";
import "./Card.css";

const Card = ({ imgSrc, imgAlt, title, description, buttonText, onclick }) => {
  return (
    <div className="role-card">
      <div className="card-icon">
        <img src={imgSrc} alt={imgAlt} />
      </div>
      <h4 className="card-title">{title}</h4>
      <p className="card-description">{description}</p>
      <button className="card-button" onClick={onclick}>
        {buttonText}
      </button>
    </div>
  );
};

export default Card;
