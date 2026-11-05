import { companyInfo } from "../data";

export default function About({ onOpenBooking, onOpenPhoto }) {
  return (
    <section className="about-section" id="about">
      <div className="container">
        <div className="about-grid">
          <div className="about-visual reveal left">
            <div className="about-collage">
              <div
                className="about-photo-main"
                onClick={() =>
                  onOpenPhoto?.({
                    src: "/images/tour-bus-group.jpg",
                    thumbTitle: "Our Happy Travelers in Luxury AC Bus",
                    categoryLabel: "Group & Family Journeys",
                    location: "Karnataka Tour with Hubbali Travel World",
                    caption: "Real smiles from our travelers enjoying comfortable transit across Karnataka.",
                  })
                }
              >
                <img
                  src="/images/tour-bus-group.jpg"
                  alt="Happy travelers inside our tourist traveler bus"
                  className="collage-img"
                />
                <span className="photo-credit-badge">Verified Hubbali Guests</span>
              </div>

              <div
                className="about-photo-sub"
                onClick={() =>
                  onOpenPhoto?.({
                    src: "/images/sunset-river-viewers.jpg",
                    thumbTitle: "Golden Hour River Vistas",
                    categoryLabel: "Scenic Sunsets",
                    location: "Tungabhadra River Valley",
                    caption: "Guests soaking in the magic of Karnataka golden hour.",
                  })
                }
              >
                <img
                  src="/images/sunset-river-viewers.jpg"
                  alt="Travelers taking photos of sunset over river"
                  className="collage-img"
                />
              </div>

              <div className="experience-badge">
                <strong>{companyInfo.yearsExp}</strong>
                <span>Years of Trusted Travel Services</span>
              </div>
            </div>
          </div>

          <div className="about-content reveal right">
            <span className="eyebrow">ABOUT HUBBALI TRAVEL WORLD</span>
            <h2 className="title">Crafting Unforgettable Journeys Across Karnataka & South India</h2>

            <p className="lead-text">
              Based in the vibrant heart of North Karnataka—<strong>Hubballi</strong>—we are proud to be your
              premier travel companion, whether you seek the ancient stone wonders of Hampi, divine shores of
              Murudeshwar, or lush Western Ghats jungles in Dandeli.
            </p>

            <p className="body-text">
              We understand that a great trip is not just about reaching a destination; it's about the warmth of
              a skilled driver who knows every viewpoint, the peace of mind in a sanitised and comfortable cab,
              and the joy of discovering authentic local secrets.
            </p>

            <div className="about-features">
              <div className="about-feat-item">
                <span className="feat-ico">⭐</span>
                <div>
                  <h4>100% Local Expertise</h4>
                  <p>Born and rooted in Hubballi, offering unmatched knowledge of regional routes and cultures.</p>
                </div>
              </div>

              <div className="about-feat-item">
                <span className="feat-ico">🚗</span>
                <div>
                  <h4>Sanitized Private Fleet</h4>
                  <p>From sedans and SUVs to 12-26 seater luxury Tempo Travelers with professional chauffeurs.</p>
                </div>
              </div>

              <div className="about-feat-item">
                <span className="feat-ico">✨</span>
                <div>
                  <h4>Customized to Your Rhythm</h4>
                  <p>Flexible schedules for families with seniors, kids, photography enthusiasts, or adventure groups.</p>
                </div>
              </div>
            </div>

            <div className="about-actions">
              <button onClick={() => onOpenBooking?.()} className="btn btn-gold">
                Plan Your Trip With Us →
              </button>
              <a href={`tel:${companyInfo.phoneRaw}`} className="btn btn-outline-navy">
                📞 Speak to Our Travel Planner
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
