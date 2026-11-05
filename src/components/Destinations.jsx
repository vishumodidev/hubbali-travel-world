import { useRef } from "react";
import { destinations } from "../data";

export default function Destinations({ onOpenBooking, onOpenPhoto }) {
  const track = useRef(null);
  const scroll = (dx) => track.current?.scrollBy({ left: dx, behavior: "smooth" });

  return (
    <section className="destinations-section" id="destinations">
      <div className="container">
        <div className="dest-head reveal">
          <div>
            <span className="eyebrow">POPULAR DESTINATIONS</span>
            <h2 className="title">Top Places to Explore from Hubballi</h2>
            <p className="subtitle">
              Centrally connected from Hubballi, travel seamlessly to world heritage marvels, divine coastlines,
              and serene Western Ghats sanctuaries.
            </p>
          </div>
          <div className="carousel-nav-arrows">
            <button className="arrow-btn" onClick={() => scroll(-320)} aria-label="Previous destination">
              ‹
            </button>
            <button className="arrow-btn" onClick={() => scroll(320)} aria-label="Next destination">
              ›
            </button>
          </div>
        </div>

        <div className="dest-carousel-wrap reveal">
          <div className="dest-track" ref={track}>
            {destinations.map((d) => (
              <div key={d.id} className="dest-card">
                <div
                  className="dest-image-bg"
                  style={{ backgroundImage: `url(${d.image})` }}
                  onClick={() =>
                    onOpenPhoto?.({
                      src: d.image,
                      thumbTitle: d.name,
                      categoryLabel: d.category,
                      location: d.state,
                      caption: `${d.name}: ${d.tag}. ${d.highlight}`,
                    })
                  }
                >
                  <span className="dest-badge">{d.category}</span>
                  <div className="dest-rating">
                    <span>★ {d.rating}</span>
                  </div>
                </div>

                <div className="dest-details">
                  <div className="dest-meta-top">
                    <span className="dest-duration">⏱ {d.duration}</span>
                    <span className="dest-state">📍 {d.state}</span>
                  </div>
                  <h3 className="dest-title">{d.name}</h3>
                  <p className="dest-tag">{d.tag}</p>
                  <p className="dest-highlight">{d.highlight}</p>

                  <div className="dest-footer">
                    <button
                      className="btn btn-sm btn-gold"
                      onClick={() => onOpenBooking?.({ destination: d.name })}
                    >
                      Book Tour →
                    </button>
                    <button
                      className="btn btn-sm btn-ghost"
                      onClick={() =>
                        onOpenPhoto?.({
                          src: d.image,
                          thumbTitle: d.name,
                          categoryLabel: d.category,
                          location: d.state,
                          caption: `${d.name}: ${d.tag}. ${d.highlight}`,
                        })
                      }
                    >
                      🔍 View Photo
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
