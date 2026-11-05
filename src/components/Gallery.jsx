import { useState } from "react";
import { galleryPhotos } from "../data";

export default function Gallery({ onSelectPhoto }) {
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { key: "all", label: "All Real Moments" },
    { key: "coracle", label: "🛶 Coracle River Safaris" },
    { key: "heritage", label: "🏛️ Temples & Heritage" },
    { key: "fleet", label: "🚐 Tour Cabs & Buses" },
    { key: "sunset", label: "🌅 Sunsets & Scenery" },
    { key: "nature", label: "🌿 Nature & Wildlife" },
  ];

  const filteredPhotos =
    activeCategory === "all"
      ? galleryPhotos
      : galleryPhotos.filter((p) => p.category === activeCategory);

  return (
    <section className="gallery-section" id="gallery">
      <div className="container">
        <div className="gallery-head text-center reveal">
          <span className="eyebrow">AUTHENTIC TRAVEL MEMORIES</span>
          <h2 className="title">Moments from Our Journeys</h2>
          <p className="subtitle mx-auto">
            Real travelers, authentic smiles, and unforgettable Karnataka landscapes. Every photo below was captured
            during our guided excursions, coracle river rides, and heritage road trips.
          </p>

          <div className="gallery-filters">
            {categories.map((c) => (
              <button
                key={c.key}
                className={`filter-btn ${activeCategory === c.key ? "active" : ""}`}
                onClick={() => setActiveCategory(c.key)}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        <div className="gallery-bento-grid reveal">
          {filteredPhotos.map((photo, index) => (
            <div
              key={photo.id}
              className={`gallery-item ${index === 0 ? "featured-item" : ""}`}
              onClick={() => onSelectPhoto(photo)}
            >
              <div className="gallery-item-inner">
                <img
                  src={photo.src}
                  alt={photo.thumbTitle}
                  className="gallery-photo"
                  loading="lazy"
                />
                <div className="gallery-overlay">
                  <span className="gallery-tag">{photo.categoryLabel}</span>
                  <div className="gallery-text">
                    <h4 className="gallery-photo-title">{photo.thumbTitle}</h4>
                    <p className="gallery-photo-loc">📍 {photo.location}</p>
                    <span className="gallery-zoom-hint">🔍 Click to enlarge</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="gallery-footer-bar reveal">
          <div className="gallery-cta-box">
            <div>
              <h3>Want to create memories like these?</h3>
              <p>We tailor custom photography tours, river coracle excursions, and family vacations.</p>
            </div>
            <a href="#contact" className="btn btn-gold">
              Start Planning Today →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
