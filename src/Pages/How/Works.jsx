import "./HowStyles/Works.css";
import { IoIosArrowForward, IoMdCheckmarkCircleOutline } from "react-icons/io";

import { FiUser } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa6";
import { LuWallet } from "react-icons/lu";
import React from "react";

const worksData = [
  {
    id: 1,
    icon: <FiUser />,
    title: "Create Your Pregnancy Profile",
    points: [
      "Input your Expected Date of Delivery",
      "Select your preferred hospital",
      "Personalize your pregnancy journey",
    ],
  },
  {
    id: 2,
    icon: <FaRegHeart />,
    title: "Track & Stay Guided",
    points: ["Personalized nutrition guidance", "Health reminders & tracking"],
  },
  {
    id: 3,
    icon: <LuWallet />,
    title: "Prepare Financially for Delivery",
    points: [
      "Save toward delivery costs",
      "Monitor emergency wallet progress",
      "Hospital verification support",
    ],
  },
];

const Works = () => {
  return (
    <main className="Works-Container">
      <div className="Works-top-text">
        <h1>How MaternalPath Works</h1>
        <p>Three simple steps to a supported pregnancy journey</p>
      </div>

      <section className="Works-top-card-holder">
        {worksData.map((item, index) => (
          <React.Fragment key={item.id}>
            <div className="Works-Cards">
              <button className="works-icons-circle">{item.icon}</button>

              <h3>{item.title}</h3>

              {item.points.map((point, i) => (
                <p key={i}>
                  <IoMdCheckmarkCircleOutline className="Mark-icons" />
                  {point}
                </p>
              ))}
            </div>

            {index !== worksData.length - 1 && (
              <IoIosArrowForward className="side_arrow" />
            )}
          </React.Fragment>
        ))}
      </section>
    </main>
  );
};

export default Works;