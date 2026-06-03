import React from "react";
import ErrorImage from "../../assets/ErrorImage.png";
import "./ErrorPage.css";

const ErrorPage = () => {
  return (
    <div className="err-layout">
      <img className="err-image" src={ErrorImage} alt={"errImage"} />
    </div>
  );
};

export default ErrorPage;
