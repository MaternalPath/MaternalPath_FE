import "./Card.css";

const Card = ({ imgSrc, imgAlt, title, description, buttonText, onclick }) => {
  return (
    <div className="role-card"  onClick={onclick}>
      <div className="card-icon">
        <img src={imgSrc} alt={imgAlt} />
      </div>
      <h4 className="card-title">{title}</h4>
      <p className="card-description">{description}</p>
      <button className="card-button">
        {buttonText}
      </button>
    </div>
  );
};

export default Card;
