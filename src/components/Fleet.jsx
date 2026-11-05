import { useState } from "react";
import { fleet, companyInfo, karnatakaDistricts, vehicleRates } from "../data";

export default function Fleet({ onOpenBooking, onOpenPhoto }) {
  const [calcDistrict, setCalcDistrict] = useState("Vijayanagara (Hampi)");
  const [calcPeople, setCalcPeople] = useState("4");

  const getVehicleForCount = (count) => {
    const num = parseInt(count, 10);
    if (num <= 4) return vehicleRates[0]; // sedan (Rs.12/km)
    if (num <= 7) return vehicleRates[1]; // 7-seater (Rs.15/km)
    if (num === 8) return vehicleRates[2]; // 8-seater (Rs.18/km)
    return vehicleRates[3]; // tempo traveler (Rs.22/km)
  };

  const selectedVeh = getVehicleForCount(calcPeople) || vehicleRates[0];

  const handleFleetInquiry = (item) => {
    const text = `Hello Hubbali Travel World! 👋%0A%0AI would like to inquire about booking: *${item.title}* (${item.pricing}). Please share available vehicle options for my travel dates.`;
    window.open(`https://wa.me/${companyInfo.whatsapp.replace("+", "")}?text=${text}`, "_blank");
  };

  const handleCalcBook = () => {
    onOpenBooking?.({
      destination: calcDistrict,
      serviceType: selectedVeh.name,
      peopleCount: calcPeople,
      vehicleType: selectedVeh.type,
    });
  };

  return (
    <section className="fleet-section" id="fleet">
      <div className="container">
        <div className="section-header text-center reveal">
          <span className="eyebrow">TRANSPARENT PER-KM PRICING • ALL 31 KARNATAKA DISTRICTS</span>
          <h2 className="title">Choose Your Vehicle Based on Number of People</h2>
          <p className="subtitle mx-auto">
            Honest per-kilometer pricing across all 31 districts of Karnataka. Clean, sanitized AC vehicles
            equipped with roof carriers and experienced local chauffeurs.
          </p>

          <div className="pricing-summary-bar">
            <div className="p-sum-item">
              <strong>Sedan Vehicle</strong>
              <span>Rs. 12 / Km</span>
              <small>1 to 4 People</small>
            </div>
            <div className="p-sum-divider" />
            <div className="p-sum-item">
              <strong>7-Seater Vehicle</strong>
              <span>Rs. 15 / Km</span>
              <small>5 to 7 People</small>
            </div>
            <div className="p-sum-divider" />
            <div className="p-sum-item">
              <strong>8-Seater Vehicle</strong>
              <span>Rs. 18 / Km</span>
              <small>Up to 8 People</small>
            </div>
            <div className="p-sum-divider" />
            <div className="p-sum-item">
              <strong>Tempo Traveler</strong>
              <span>Rs. 22 / Km</span>
              <small>9+ Group Tours</small>
            </div>
          </div>
        </div>

        {/* Interactive Karnataka District Fare Calculator */}
        <div className="fleet-calc-card reveal">
          <div className="calc-left">
            <span className="eyebrow">QUICK RATE FINDER</span>
            <h3>Calculate Fare for Any Karnataka District</h3>
            <p>Select your destination district and passenger count to find your recommended vehicle and fixed per-km rate.</p>

            <div className="calc-controls">
              <div className="calc-field">
                <label>Destination District in Karnataka (31 Districts)</label>
                <select value={calcDistrict} onChange={(e) => setCalcDistrict(e.target.value)}>
                  {karnatakaDistricts.map((d) => (
                    <option key={`calc-${d.id}`} value={d.name}>
                      {d.name} ({d.keyAttractions})
                    </option>
                  ))}
                </select>
              </div>

              <div className="calc-field">
                <label>Number of People (Passengers)</label>
                <select value={calcPeople} onChange={(e) => setCalcPeople(e.target.value)}>
                  <option value="2">1 to 2 People (Sedan)</option>
                  <option value="4">3 to 4 People (Sedan)</option>
                  <option value="6">5 to 6 People (7-Seater)</option>
                  <option value="7">7 People (7-Seater)</option>
                  <option value="8">8 People (8-Seater)</option>
                  <option value="12">9 to 12 People (Tempo Traveler)</option>
                  <option value="17">13 to 17 People (Tempo Traveler)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="calc-right">
            <div className="calc-result-box">
              <span className="result-label">Recommended Vehicle</span>
              <h4>{selectedVeh.name}</h4>
              <div className="result-rate-display">
                <span className="rate-num">{selectedVeh.rateFormatted}</span>
                <span className="rate-type">Fixed Tariff</span>
              </div>
              <p className="result-capacity">
                👥 Capacity: <strong>{selectedVeh.capacity}</strong> • 🚘 Models: {selectedVeh.models}
              </p>
              <button onClick={handleCalcBook} className="btn btn-gold w-100 mt-3">
                Book to {calcDistrict.split("(")[0]} at {selectedVeh.rateFormatted} →
              </button>
            </div>
          </div>
        </div>

        {/* Grid of Vehicles */}
        <div className="fleet-grid">
          {fleet.map((item, idx) => (
            <div key={item.id} className={`fleet-card reveal delay${idx + 1}`}>
              <div
                className="fleet-image-wrap"
                onClick={() =>
                  onOpenPhoto?.({
                    src: item.image,
                    thumbTitle: item.title,
                    categoryLabel: "Our Verified Fleet",
                    location: "Karnataka & Outstation Tours",
                    caption: item.description,
                  })
                }
              >
                <img src={item.image} alt={item.title} className="fleet-img" />
                <span className="fleet-tag-pill">{item.tag}</span>
                <span className="fleet-pricing-badge">{item.pricing}</span>
              </div>

              <div className="fleet-info">
                <span className="fleet-category">{item.category}</span>
                <h3 className="fleet-title">{item.title}</h3>
                <p className="fleet-desc">{item.description}</p>

                <div className="fleet-specs">
                  <div className="spec-item">
                    <span className="spec-icon">👥</span>
                    <div>
                      <small>Capacity</small>
                      <strong>{item.capacity}</strong>
                    </div>
                  </div>
                  <div className="spec-item">
                    <span className="spec-icon">🧳</span>
                    <div>
                      <small>Luggage</small>
                      <strong>{item.luggage}</strong>
                    </div>
                  </div>
                </div>

                <div className="fleet-features-list">
                  {item.features.map((feat, fidx) => (
                    <span key={fidx} className="feat-chip">
                      ✓ {feat}
                    </span>
                  ))}
                </div>

                <div className="fleet-card-actions">
                  <button
                    className="btn btn-gold"
                    onClick={() =>
                      onOpenBooking?.({
                        destination: item.title,
                        serviceType: item.category,
                      })
                    }
                  >
                    Book This Vehicle →
                  </button>
                  <button
                    className="btn btn-whatsapp-subtle"
                    onClick={() => handleFleetInquiry(item)}
                  >
                    💬 WhatsApp Quote
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="fleet-banner-strip reveal">
          <div className="strip-item">
            <span className="strip-icon">🗺️</span>
            <div>
              <strong>All 31 Karnataka Districts Covered</strong>
              <p>Hampi, Murudeshwar, Gokarna, Badami, Coorg, Mysore, Bangalore & more</p>
            </div>
          </div>
          <div className="strip-item">
            <span className="strip-icon">✈️</span>
            <div>
              <strong>Hubballi Airport (HBX) & Junction (UBL)</strong>
              <p>Punctual 24/7 pickup and drop with flight & train tracking</p>
            </div>
          </div>
          <div className="strip-item">
            <span className="strip-icon">🧾</span>
            <div>
              <strong>Honest Metered / Fixed Per-Km Billing</strong>
              <p>Sedan: Rs.12/Km • 7-Seater: Rs.15/Km • 8-Seater: Rs.18/Km</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
