import React from "react";
import "./Css/WelcomeHeader.css";

const WelcomeHeader = () => {
  const name = (localStorage.getItem("name") || "").trim();

  return (
    <div className="dashboard-header">
      <h1>Welcome back{name ? `, ${name}` : ""}</h1>
      <p>Here's your pregnancy journey overview</p>
    </div>
  );
};

export default WelcomeHeader;
