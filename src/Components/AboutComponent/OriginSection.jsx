import "./Css/OriginSection.css";

const OriginSection = () => {
  return (
    <section className="origin-section">
      <div className="origin-content">
        <div className="quote-box">
          <span className="quote-mark">"</span>
          <p className="quote-text">
            We kept hearing the same story: a mother arrives at the hospital,
            ready to deliver — and the family scrambles for funds they hadn't
            had time to prepare. That moment shouldn't be defined by financial
            panic.
          </p>
          <span className="quote-author">— Founding Team, MaternalPath</span>
        </div>
        <div className="origin-text">
          <span className="section-label">OUR ORIGIN</span>
          <p>
            In Nigeria and Africa at large, maternal health outcomes are still
            deeply shaped by access to information and financial readiness. Many
            mothers begin their pregnancies without a clear guide, without
            knowing what to expect week to week, and without a structured way to
            prepare for the costs of delivery.
          </p>
          <p>
            We built MaternalPath out of a desire to bridge that gap — to give
            every pregnant woman a trusted companion through her journey. One
            that doesn't just inform, but that supports, guides, and prepares
            her emotionally and financially.
          </p>
          <p>
            Because every mother deserves to walk into delivery day feeling
            ready, informed, and supported — not anxious and unprepared.
          </p>
        </div>
      </div>
    </section>
  );
};

export default OriginSection;
