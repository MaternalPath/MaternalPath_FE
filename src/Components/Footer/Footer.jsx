// import React from 'react'

// const Footer = () => {
//   return (
//     <div>
//       hello
//     </div>
//   )
// }

// export default Footer

import "./Footer.css";
import { GrFacebookOption } from "react-icons/gr";
import { AiOutlineInstagram } from "react-icons/ai";
import { RiTwitterXFill } from "react-icons/ri";
import { BiLogoLinkedin } from "react-icons/bi";

const Footer = () => {
  return (
    <main className="Footer-container">
      <section className="Footer-top">
        <aside className="footer-logo-holder">
          <img
            src="https://i.postimg.cc/C1X6VXtp/MP-Logo.png"
            alt="MaternalPath Logo"
            className="footer-logo"
          />
          <p>
            Empowering mothers with guidance, support, and financial security
            throughout their pregnancy journey.
          </p>
          <p className="paragraph-footer">
            A comprehensive platform with resources, support, and
            financial security for your pregnancy journey.
          </p>
        </aside>

        {/* <section className="mobile-footer">

          <aside className="footer-text-holder">
          <h2>Platform</h2>
          <ul>
            <li>For Mothers</li>
            <li>For Hospitals</li>
          </ul>
          </aside>
          <aside className="footer-text-holder">
            <h2>Company</h2>
            <ul>
              <li>About Us</li>
              <li>Privacy Policy</li>
            </ul>
          </aside>
          <p>© 2026 MaternalPath All rights reserved.</p>
        </section> */}

        <aside className="footer-text-holder">
          <h2>Platform</h2>
          <ul>
            <li>How It Works</li>
            <li>Features</li>
            <li>Pricing</li>
            <li>FAQ</li>
          </ul>
        </aside>

        <aside className="footer-text-holder">
          <h2>Resources</h2>
          <ul>
            <li>Pregnancy Guide</li>
            <li>Nutrition Tips</li>
            <li>Financial Planning</li>
            <li>Blog</li>
          </ul>
        </aside>
        <aside className="footer-text-holder">
          <h2>Company</h2>
          <ul>
            <li>About Us</li>
            <li>Contact</li>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
          </ul>
        </aside>
      </section>

      <section className="mobile-footer-container">
        <aside className="footer-text-holder">
        <h2>Platform</h2>
        <ul>
          <li>For Mothers</li>
          <li>For Hospitals</li>
        </ul>
        </aside>
        <aside className="footer-text-holder">
          <h2>Company</h2>
          <ul>
            <li>About Us</li>
            <li>Privacy Policy</li>
          </ul>
        </aside>
      </section>
      
      <section className="Footer-bottom">
        <p>© 2026 MaternalPath All rights reserved.</p>
        <aside className="icons-holder">
          <button className="social-icons-circle">
            <GrFacebookOption />
          </button>
          <button className="social-icons-circle">
            <AiOutlineInstagram />
          </button>
          <button className="social-icons-circle">
            <RiTwitterXFill />
          </button>
          <button className="social-icons-circle">
            <BiLogoLinkedin />
          </button>
        </aside>
      </section>
    </main>
  );
};

export default Footer;