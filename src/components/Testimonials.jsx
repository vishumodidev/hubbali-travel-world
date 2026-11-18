import React, { useEffect, useState } from "react";
import { testimonials, companyInfo } from "../data";
import { GoogleGIcon } from "./SocialIcons";

const perViewFor = () => {
  if (typeof window === "undefined") return 3;
  if (window.innerWidth <= 640) return 1;
  if (window.innerWidth <= 1024) return 2;
  return 3;
};

const CATEGORIES = [
  { key: "all", label: "All Reviews" },
  { key: "tempo", label: "Tempo Traveler & Family" },
  { key: "hampi", label: "Hampi & Coracle" },
  { key: "cab", label: "Outstation Cabs" },
  { key: "heritage", label: "Heritage & Pilgrimage" },
];

export default function Testimonials() {
  const [selectedCat, setSelectedCat] = useState("all");
  const [perView, setPerView] = useState(perViewFor());
  const [idx, setIdx] = useState(0);

  const filtered = selectedCat === "all"
    ? testimonials
    : testimonials.filter((t) => t.category === selectedCat || t.trip.toLowerCase().includes(selectedCat));

  const items = filtered.length > 0 ? filtered : testimonials;
  const pages = Math.max(1, items.length - perView + 1);

  useEffect(() => {
    const onResize = () => setPerView(perViewFor());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    setIdx(0);
  }, [selectedCat]);

  useEffect(() => {
    if (pages <= 1) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % pages), 6000);
    return () => clearInterval(t);
  }, [pages]);

  const current = Math.min(idx, pages - 1);

  const handlePrev = () => {
    setIdx((i) => (i === 0 ? pages - 1 : i - 1));
  };

  const handleNext = () => {
    setIdx((i) => (i + 1) % pages);
  };

  return (
    <section className="testimonials-section" id="testimonials">
      <div className="container">
        {/* Section Header & Google Review Trust Card */}
        <div className="testimonials-head reveal">
          <div>
            <span className="eyebrow">GOOGLE CUSTOMER REVIEWS</span>
            <h2 className="title">Real Stories from Real Journeys</h2>
            <p className="subtitle">
              Over 50,000 travelers have journeyed with us across Karnataka and beyond. Here is what they have to say on Google Maps.
            </p>
          </div>

          <div className="google-review-header-badge">
            <div className="gr-badge-top">
              <div className="gr-logo-wrap">
                <GoogleGIcon size={26} />
              </div>
              <div className="gr-rating-info">
                <div className="gr-score-row">
                  <strong className="gr-score">{companyInfo.rating}</strong>
                  <span className="gr-stars">★★★★★</span>
                </div>
                <small className="gr-count">Based on {companyInfo.reviewsCount} Google Reviews</small>
              </div>
            </div>

            <div className="gr-badge-actions">
              <a
                href={companyInfo.googleReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-google-review"
                title="Review Hubbali Travel World on Google"
              >
                <GoogleGIcon size={14} />
                <span>Write a Review</span>
              </a>
              <a
                href={companyInfo.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-outline-google"
                title="View all reviews on Google Maps"
              >
                <span>View on Maps ↗</span>
              </a>
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="testimonials-filter-bar reveal">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              className={`t-filter-btn ${selectedCat === cat.key ? "active" : ""}`}
              onClick={() => setSelectedCat(cat.key)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Reviews Carousel Track */}
        <div className="t-wrap reveal">
          <div
            className="t-track"
            style={{ transform: `translateX(-${current * (100 / perView)}%)` }}
          >
            {items.map((t) => (
              <div
                className="t-card"
                key={t.id || t.name}
                style={{ flex: `0 0 ${100 / perView}%` }}
              >
                <div className="testimonial-card-inner">
                  {/* Google Verified Card Header */}
                  <div className="t-card-google-meta">
                    <div className="t-google-pill">
                      <GoogleGIcon size={15} />
                      <span>Verified Google Review</span>
                    </div>
                    <span className="t-review-date">{t.date || "Verified Trip"}</span>
                  </div>

                  <div className="t-stars-row">
                    <div className="t-stars">{"★".repeat(t.rating || 5)}</div>
                    <span className="t-score-num">5.0</span>
                  </div>

                  <p className="t-quote">"{t.text}"</p>

                  <div className="t-author-box">
                    <div className="t-avatar-wrap">
                      <img
                        src={t.avatar}
                        alt={t.name}
                        className="t-avatar-img"
                        loading="lazy"
                      />
                    </div>
                    <div className="t-author-meta">
                      <h4 className="t-author-name">
                        {t.name} <span className="verified-check" title="Verified Customer">✓</span>
                      </h4>
                      <span className="t-author-loc">📍 {t.location}</span>
                      <span className="t-trip-tag">✨ {t.trip}</span>
                    </div>
                  </div>

                  <div className="t-card-footer">
                    <a
                      href={companyInfo.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="t-read-more-link"
                    >
                      Read full review on Google Maps ↗
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Navigation Arrows & Dots */}
        <div className="testimonials-controls">
          <button
            onClick={handlePrev}
            className="t-nav-arrow prev"
            aria-label="Previous reviews"
          >
            ‹
          </button>

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

          <button
            onClick={handleNext}
            className="t-nav-arrow next"
            aria-label="Next reviews"
          >
            ›
          </button>
        </div>

        {/* Google Reviews Bottom Banner */}
        <div className="google-reviews-bottom-banner reveal">
          <div className="gr-bottom-content">
            <div className="gr-bottom-icon">
              <GoogleGIcon size={32} />
            </div>
            <div>
              <h4>Have You Traveled With Us?</h4>
              <p>Your feedback helps fellow travelers discover authentic Karnataka experiences. Share your review on Google!</p>
            </div>
          </div>
          <a
            href={companyInfo.googleReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-gold btn-google-cta"
          >
            ⭐ Rate Us on Google Reviews ↗
          </a>
        </div>
      </div>
    </section>
  );
}
