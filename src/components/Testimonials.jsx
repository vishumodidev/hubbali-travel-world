import { useEffect, useState } from "react";
import { testimonials } from "../data";

const perViewFor = () => (typeof window !== "undefined" && window.innerWidth <= 900 ? 1 : 3);

export default function Testimonials() {
  const [perView, setPerView] = useState(perViewFor());
  const [idx, setIdx] = useState(0);
  const pages = Math.max(1, testimonials.length - perView + 1);

  useEffect(() => {
    const onResize = () => setPerView(perViewFor());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % pages), 5500);
    return () => clearInterval(t);
  }, [pages]);

  const current = Math.min(idx, pages - 1);

  return (
    <section className="testimonials-section" id="testimonials">
      <div className="container">
        <div className="testimonials-head reveal">
          <div>
            <span className="eyebrow">HAPPY TRAVELERS</span>
            <h2 className="title">Real Stories from Real Journeys</h2>
            <p className="subtitle">
              Over 50,000 travelers have journeyed with us across Karnataka and beyond. Here is what they have to say.
            </p>
          </div>
          <div className="google-badge-pill">
            <span className="g-icon">G</span>
            <div>
              <strong>4.9 / 5.0 Rating</strong>
              <small>Based on 1,250+ Verified Reviews</small>
            </div>
          </div>
        </div>

        <div className="t-wrap reveal">
          <div
            className="t-track"
            style={{ transform: `translateX(-${current * (100 / perView)}%)` }}
          >
            {testimonials.map((t) => (
              <div className="t-card" key={t.name}>
                <div className="testimonial-card-inner">
                  <div className="t-stars">★★★★★</div>
                  <p className="t-quote">"{t.text}"</p>

                  <div className="t-author-box">
                    <div className="t-avatar-wrap">
                      <img src={t.avatar} alt={t.name} className="t-avatar-img" />
                    </div>
                    <div className="t-author-meta">
                      <h4 className="t-author-name">{t.name}</h4>
                      <span className="t-author-loc">📍 {t.location}</span>
                      <span className="t-trip-tag">✨ {t.trip}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="testimonials-dots">
          {Array.from({ length: pages }).map((_, i) => (
            <button
              key={i}
              className={`t-dot ${i === current ? "active" : ""}`}
              onClick={() => setIdx(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
