import { LuBuilding2 } from "react-icons/lu";
import "./Css/TeamSection.css";
import img1 from "/src/assets/raphaelAyo.jpg";
import img2 from "/src/assets/abdulbakky.jpg";
import img3 from "/src/assets/olachi.jpg";
import img4 from "/src/assets/micheal.jpg";
import img5 from "/src/assets/maria.jpg";
import img6 from "/src/assets/Passport2.jpeg";

const TeamSection = () => {
  const team = [
    {
      id: 1,
      name: "Raphael Ayomide",
      role: "Product Designer",
      img: img1,
    },
    {
      id: 2,
      name: "Tiamiyu Abdulbakky",
      role: "Product Designer",
      img: img2,
    },
    {
      id: 3,
      name: "Mariagoretti Nnaemeka Nnadi",
      role: "Front End Developer",
      img: img5,
    },
    {
      id: 4,
      name: "Raphael Oluwapelumi John",
      role: "Front End Developer",
      img: img6,
    },
    {
      id: 5,
      name: "Olachi Faith",
      role: "Backend Developer",
      img: img3,
    },
    {
      id: 6,
      name: "Michael Wonah",
      role: "Backend Developer",
      img: img4,
    },
    
  ];

  return (
    <section className="team-section" id="teamSection">
      <div className="teamW-layout">
        <span className="section-label center">
        THE PEOPLE BEHIND THE PLATFORM
      </span>
      <h2 className="section-title center">
        A Team Built on <em>Compassion</em>
      </h2>
      <p className="section-desc center">
        We're a team of technologists, and builders who believe that access to
        maternal <br /> support is not a privilege — it's a right.
      </p>
      </div>
      <div className="team-grid">
        {team.map((member) => (
          <div key={member.id} className="team-card">
            <div className="team-img">
              <img src={member.img} alt={member.name} />
              <div className="team-overlay">
                <h4 className="team-name">{member.name}</h4>
                <p className="team-role">{member.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="collab-banner">
        <aside className="collab-wrap-layout">
          <LuBuilding2  size={20} />
        </aside>
        
        <div className="collab-text">
          <strong>Healthcare Collaboration Network</strong>
          <p>
            We partner with hospitals, maternity clinics, and currently seeking
            to collaborate with maternal health NGOs across Nigeria to ensure
            our platform aligns with real clinical workflows and community
            needs.
          </p>
        </div>
        <div className="collab-dots">
          <img src="/src/assets/Container.png" alt="" />
          
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
