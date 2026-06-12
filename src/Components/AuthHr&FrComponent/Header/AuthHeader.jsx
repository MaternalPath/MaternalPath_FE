import "./AuthHeader.css";
import { useNavigate } from "react-router-dom";
import authLogo from "../../../assets/header.png";

const Header = () => {
  const nav = useNavigate();

  return (
    <>
      <header className="AuthHeader-container">
        <div className="AuthHeader-wrapper">
          <div className="AuthHeader" onClick={() => nav("/")}>
            <div className="AuthHeader-left">
              <img
                className="AuthHeader-left-image"
                src={authLogo}
                alt="logo"
              />
            </div>

            <div className="AuthHeader-right">
              <button
                className="AuthHeader-right-1"
                onClick={() => nav("/login")}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
