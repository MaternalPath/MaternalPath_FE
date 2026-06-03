import "./FaqStyles/Topics.css";
import { LuMessageCircle } from "react-icons/lu";

const Topics = () => {
  const cardData = [
    {
      id: 1,
      title: "Account Setup",
      description:
        "Learn how to create your account, verify your identity, and set up your profile.",
      view: "View Guide →",
    },
    {
      id: 2,
      title: "Making Deposits",
      description:
        "All the ways you can add money to your delivery fund and set up automatic savings.",
      view: "View Guide →",
    },
    {
      id: 3,
      title: "Hospital Payment",
      description:
        " How fund releases work when it's time for delivery and what to expect.",
      view: "View Guide →",
    },
  ];
  return (
    <div className="Topic_container">
      <h2>Popular Topics</h2>
      <div className="TopicsHolder">
        {cardData.map((item) => (
          <div className="Cards" key={item.id}>
            <button className="circle-icons">
              <LuMessageCircle style={{ fontSize: "24px" }} />
            </button>
            <h5>{item.title}</h5>
            <p>{item.description}</p>
            <h6>{item.view}</h6>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Topics;