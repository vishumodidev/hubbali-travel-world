import React, { useState } from "react";
import { packages, companyInfo } from "../data";

export default function Packages({ onOpenBooking, onOpenPhoto }) {
  const [filter, setFilter] = useState("all");

  const handleDirectWhatsApp = (pkg) => {
    const text = `Hello Hubbali Travel World! 👋%0A%0AI am interested in the *${pkg.name}* (${pkg.days}) package starting at ₹${pkg.price}. Please share the detailed cultural itinerary and custom options.`;
    window.open(`https://wa.me/${companyInfo.whatsapp.replace("+", "")}?text=${text}`, "_blank");
  };

  const filteredPackages = packages.filter((p) => {
    if (filter === "pilgrimage") return p.badge.toLowerCase().includes("pilgrimage") || p.badge.toLowerCase().includes("sacred");
    if (filter === "heritage") return p.badge.toLowerCase().includes("heritage");
    return true;
  });

  return (
    <section className="packages-section" id="packages">
      <div className="container">
        <div className="pk-head reveal">
          <div>
            <span className="eyebrow">CULTURAL & SPIRITUAL EXPERIENCES</span>
            <h2 className="title">Curated Holiday & Pilgrimage Packages</h2>
            <p className="subtitle">
              Authentic cultural tours with verified photos of sacred shrines, UNESCO monuments, and holy rivers.
              Every package includes comfortable sanitised cabs/buses, certified local guides, and senior-friendly darshan assistance.
            </p>
          </div>
          <div className="pk-head-actions">
            <button onClick={() => onOpenBooking?.()} className="btn btn-outline-navy">
              Custom Package Request →
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="package-filters reveal">
          <button
            className={`pkg-filter-pill ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            All Cultural & Pilgrimage Tours ({packages.length})
          </button>
          <button
            className={`pkg-filter-pill ${filter === "pilgrimage" ? "active" : ""}`}
            onClick={() => setFilter("pilgrimage")}
          >
            🔱 Sacred Shrines & Pilgrimages
          </button>
          <button
            className={`pkg-filter-pill ${filter === "heritage" ? "active" : ""}`}
            onClick={() => setFilter("heritage")}
          >
            🏛️ UNESCO World Heritage & History
          </button>
        </div>

        <div className="packages-grid">
          {filteredPackages.map((p, i) => (
            <article key={p.id} className={`pkg-card reveal delay${(i % 4) + 1}`}>
              <div
                className="pkg-image-wrap"
                onClick={() =>
                  onOpenPhoto?.({
                    src: p.image,
                    thumbTitle: p.name,
                    categoryLabel: p.badge,
                    location: p.placeName,
                    caption: `${p.culturalTag}: ${p.overview}`,
                  })
                }
              >
                <img src={p.image} alt={p.name} className="pkg-img" />
                <span className="pkg-badge">{p.badge}</span>
                <span className="pkg-duration-pill">{p.days}</span>
                <div className="pkg-img-overlay-hint">
                  <span>🔍 View Cultural Place Photo</span>
                </div>
              </div>

              <div className="pkg-content">
                {/* Cultural Landmark Banner */}
                <div className="pkg-cultural-banner">
                  <span className="cultural-loc-tag">📍 {p.placeName}</span>
                  <span className="cultural-feature-tag">{p.culturalTag}</span>
                </div>

                <div className="pkg-price-row">
                  <div className="pkg-price">
                    <span className="rupee">₹</span>
                    <strong>{p.price}</strong>
                    <small>/ person</small>
                  </div>
                  <span className="pkg-allinc">All Inclusive</span>
                </div>

                <h3 className="pkg-title">{p.name}</h3>
                <p className="pkg-overview">{p.overview}</p>

                {/* Cultural Spots Gallery Strip */}
                {p.culturalSpots && (
                  <div className="pkg-cultural-spots-strip">
                    <span className="spots-label">Cultural Sights Included:</span>
                    <div className="spots-thumbnails">
                      {p.culturalSpots.map((spot, sidx) => (
                        <div
                          key={sidx}
                          className="spot-thumb-item"
                          title={`Click to view: ${spot.name}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenPhoto?.({
                              src: spot.src,
                              thumbTitle: spot.name,
                              categoryLabel: p.badge,
                              location: p.placeName,
                              caption: `Part of ${p.name}: ${spot.name}`,
                            });
                          }}
                        >
                          <img src={spot.src} alt={spot.name} className="spot-thumb-img" />
                          <span className="spot-thumb-name">{spot.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pkg-highlights">
                  <strong>Pilgrimage & Heritage Highlights:</strong>
                  <ul>
                    {p.highlights.map((h, idx) => (
                      <li key={idx}>✓ {h}</li>
                    ))}
                  </ul>
                </div>

                <div className="pkg-inclusions">
                  {p.inc.map((item, idx) => (
                    <span key={idx} className="inc-tag">
                      {item}
                    </span>
                  ))}
                </div>

                <div className="pkg-cta-btns">
                  <button
                    className="btn btn-gold btn-block"
                    onClick={() => onOpenBooking?.({ destination: p.name, serviceType: "Complete Tour Package" })}
                  >
                    Book This Tour →
                  </button>
                  <button
                    className="btn btn-whatsapp-subtle"
                    onClick={() => handleDirectWhatsApp(p)}
                    title="Inquire on WhatsApp"
                  >
                    💬 WhatsApp Itinerary & Quote
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
