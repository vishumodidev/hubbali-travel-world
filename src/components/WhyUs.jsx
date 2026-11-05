import { whyItems } from "../data";

export default function WhyUs() {
  return (
    <section className="why-section">
      <div className="container">
        <div className="why-header text-center reveal">
          <span className="eyebrow eyebrow-light">WHY CHOOSE US</span>
          <h2 className="title title-light">The Hubbali Travel World Promise</h2>
          <p className="subtitle subtitle-light mx-auto">
            We are committed to delivering seamless, safe, and memorable journeys with honest service and heartfelt hospitality.
          </p>
        </div>

        <div className="why-grid">
          {whyItems.map((w, i) => (
            <div key={w.title} className={`why-card reveal delay${(i % 3) + 1}`}>
              <div className="why-icon-bubble">{w.icon}</div>
              <h3 className="why-card-title">{w.title}</h3>
              <p className="why-card-text">{w.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
