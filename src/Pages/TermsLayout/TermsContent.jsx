import React, { useState, useEffect, useRef } from "react";
import { FaBalanceScale } from "react-icons/fa";
import { FiMail, FiMapPin, FiExternalLink, FiDownload } from "react-icons/fi";
import "./Css/TermsContent.css";

const TermsContent = ({ onVisibleSectionChange }) => {
  const [agreed, setAgreed] = useState(false);
  const sectionRefs = useRef({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            onVisibleSectionChange(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [onVisibleSectionChange]);

  const setRef = (id) => (el) => {
    sectionRefs.current[id] = el;
  };

  return (
    <main className="terms-content">
      <section id="welcome" ref={setRef("welcome")} className="content-card">
        <h2>
          <FaBalanceScale className="section-icon" />
          Welcome to MaternalPath
        </h2>
        <p>
          These Terms & Conditions govern the use of the MaternalPath platform,
          including pregnancy tracking, health guidance, hospital verification,
          appointment support, emergency savings services, and related features.
        </p>
        <p>
          By creating an account and using MaternalPath, users agree to comply
          with these Terms.
        </p>
      </section>

      <section
        id="eligibility"
        ref={setRef("eligibility")}
        className="content-card"
      >
        <h3>1. Eligibility</h3>
        <ul>
          <li>Users must provide accurate information during registration.</li>
          <li>
            Users are responsible for maintaining the security of their
            accounts.
          </li>
          <li>
            Users must keep profile and pregnancy information reasonably up to
            date.
          </li>
          <li>
            MaternalPath reserves the right to suspend accounts that provide
            false or misleading information.
          </li>
        </ul>
      </section>

      <section
        id="disclaimer"
        ref={setRef("disclaimer")}
        className="content-card highlight"
      >
        <h3>2. Medical Disclaimer</h3>
        <ul>
          <li>
            MaternalPath provides educational information and wellness guidance
            only.
          </li>
          <li>
            Information provided through the platform is not medical advice.
          </li>
          <li>
            MaternalPath does not replace licensed healthcare professionals.
          </li>
          <li>
            Users should consult qualified healthcare providers regarding
            medical concerns, emergencies, diagnoses, and treatment decisions.
          </li>
          <li>
            MaternalPath is not responsible for medical outcomes resulting from
            decisions made without professional consultation.
          </li>
        </ul>
      </section>

      <section id="tracking" ref={setRef("tracking")} className="content-card">
        <h3>3. Pregnancy Tracking Services</h3>
        <ul>
          <li>Pregnancy timelines and due date calculations are estimates.</li>
          <li>Health insights and reminders are informational.</li>
          <li>
            Users should verify important health information with their
            healthcare providers.
          </li>
        </ul>
      </section>

      <section id="wallet" ref={setRef("wallet")} className="content-card">
        <h3>4. Emergency Wallet Savings Program</h3>
        <ul>
          <li>
            Users may voluntarily save funds through the Emergency Wallet
            feature.
          </li>
          <li>Savings goals are determined by the user.</li>
          <li>
            MaternalPath does not guarantee that savings goals will fully cover
            delivery costs.
          </li>
          <li>
            Users remain responsible for all healthcare expenses not covered by
            their savings.
          </li>
        </ul>
        <div className="info-box">
          <h4>Hospital Service Contribution</h4>
          <p>
            Upon successful delivery at a selected participating hospital,
            MaternalPath may facilitate a service contribution equal to 1% of
            the user's total Emergency Wallet savings balance to the selected
            healthcare facility as part of platform administration and hospital
            partnership services. This contribution will be clearly disclosed to
            users before participation.
          </p>
        </div>
      </section>

      <section id="hospital" ref={setRef("hospital")} className="content-card">
        <h3>5. Hospital Services</h3>
        <ul>
          <li>
            MaternalPath may display healthcare facilities available on the
            platform.
          </li>
          <li>Hospital information is provided for convenience.</li>
          <li>
            Users remain responsible for independently evaluating healthcare
            providers.
          </li>
          <li>
            MaternalPath does not guarantee the quality of care delivered by
            third-party hospitals.
          </li>
        </ul>
      </section>

      <section
        id="responsibilities"
        ref={setRef("responsibilities")}
        className="content-card"
      >
        <h3>6. User Responsibilities</h3>
        <ul>
          <li>Provide accurate information.</li>
          <li>Protect login credentials.</li>
          <li>Use the platform lawfully.</li>
          <li>Avoid fraudulent activities.</li>
          <li>Respect platform policies.</li>
          <li>Use MaternalPath only for intended purposes.</li>
        </ul>
      </section>

      <section id="privacy" ref={setRef("privacy")} className="content-card">
        <h3>7. Privacy & Data Protection</h3>
        <ul>
          <li>
            MaternalPath processes personal information according to its Privacy
            Policy.
          </li>
          <li>
            User information is handled using reasonable security measures.
          </li>
          <li>
            Certain data may be shared with selected healthcare providers when
            consent has been granted.
          </li>
        </ul>
        <button className="btn-secondary">
          <FiExternalLink />
          View Privacy Policy
        </button>
      </section>

      <section
        id="liability"
        ref={setRef("liability")}
        className="content-card"
      >
        <h3>8. Limitation of Liability</h3>
        <ul>
          <li>MaternalPath is not responsible for indirect losses.</li>
          <li>
            MaternalPath does not guarantee uninterrupted service availability.
          </li>
          <li>
            MaternalPath is not liable for actions taken by third-party
            healthcare providers.
          </li>
        </ul>
      </section>

      <section id="changes" ref={setRef("changes")} className="content-card">
        <h3>9. Changes to These Terms</h3>
        <p>
          MaternalPath may update these Terms from time to time. Continued use
          of the platform after updates constitutes acceptance of revised Terms.
        </p>
      </section>

      <section id="contact" ref={setRef("contact")} className="content-card">
        <h3>10. Contact Us</h3>
        <div className="contact-item">
          <FiMail />
          <span>maternalpath1@gmail.com</span>
        </div>
        <div className="contact-item">
          <FiMapPin />
          <span>26 Coconut Road, Apapa, Lagos, Nigeria</span>
        </div>
      </section>

      <div className="agreement-footer">
        <label className="checkbox-wrapper">
          <input
            type="checkbox"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
          />
          <span>I have read and agree to the Terms & Conditions.</span>
        </label>

        <div className="action-buttons">
          <button className="btn-primary-terms" disabled={!agreed}>
            Accept & Continue
          </button>
          <button className="btn-outline-terms">
            <FiDownload />
            Download PDF
          </button>
        </div>
      </div>
    </main>
  );
};

export default TermsContent;
