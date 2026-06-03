import { Link } from "react-router-dom";
import { LuFacebook, LuInstagram, LuTwitter, LuLinkedin } from "react-icons/lu";
import logo from "/src/assets/header.png";
import "./Css/FooterSection.css";

const FooterSection = () => {
  const footerLinks = {
    platform: [
      { name: "How It Works", link: "/how-it-works" },
      { name: "Features", link: "/features" },
      { name: "Pricing", link: "/pricing" },
      { name: "FAQ", link: "/faq" },
    ],
    resources: [
      { name: "Pregnancy Guide", link: "/guide" },
      { name: "Nutrition Tips", link: "/nutrition" },
      { name: "Financial Planning", link: "/finance" },
      { name: "Blog", link: "/blog" },
    ],
    company: [
      { name: "About Us", link: "/about" },
      { name: "Contact", link: "/contact" },
      { name: "Privacy Policy", link: "/privacy" },
      { name: "Terms of Service", link: "/terms" },
    ],
  };

  return (
    <footer className="footer-section">
      <div className="footer-content">
        <div className="footer-brand">
          <img src={logo} alt="MaternalPath" className="footer-logo" />
          <p className="footer-tagline">
            Empowering mothers with guidance, support, and financial security
            throughout their pregnancy journey.
          </p>
        </div>
        <div className="footer-links">
          <div className="link-group">
            <h4>Platform</h4>
            {footerLinks.platform.map((l, i) => (
              <Link key={i} to={l.link}>
                {l.name}
              </Link>
            ))}
          </div>
          <div className="link-group">
            <h4>Resources</h4>
            {footerLinks.resources.map((l, i) => (
              <Link key={i} to={l.link}>
                {l.name}
              </Link>
            ))}
          </div>
          <div className="link-group">
            <h4>Company</h4>
            {footerLinks.company.map((l, i) => (
              <Link key={i} to={l.link}>
                {l.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 MaternalPath All rights reserved.</p>
        <div className="social-icons">
          <LuFacebook size={18} />
          <LuInstagram size={18} />
          <LuTwitter size={18} />
          <LuLinkedin size={18} />
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
