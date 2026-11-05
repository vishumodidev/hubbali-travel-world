import React, { useState, useEffect } from "react";
import { companyInfo, karnatakaDistricts, vehicleRates } from "../data";

export default function BookingModal({ isOpen, onClose, preset = {} }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    pickupDistrict: "Dharwad (Hubballi)",
    destinationDistrict: preset?.destination || "Vijayanagara (Hampi)",
    tourPackage: preset?.tourPackage || "",
    peopleCount: preset?.peopleCount || "4",
    vehicleType: preset?.vehicleType || "sedan",
    date: preset?.date || "",
    tripType: "Round Trip",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);

  // Auto-select vehicle based on number of people
  const handlePeopleChange = (count) => {
    const num = parseInt(count, 10);
    let autoVehicle = "sedan";
    if (num >= 1 && num <= 4) {
      autoVehicle = "sedan";
    } else if (num >= 5 && num <= 7) {
      autoVehicle = "7-seater";
    } else if (num === 8) {
      autoVehicle = "8-seater";
    } else if (num >= 9) {
      autoVehicle = "tempo-traveler";
    }

    setFormData((prev) => ({
      ...prev,
      peopleCount: count,
      vehicleType: autoVehicle,
    }));
  };

  useEffect(() => {
    if (preset && Object.keys(preset).length > 0) {
      setFormData((prev) => {
        const nextPeople = preset.peopleCount || prev.peopleCount;
        let nextVehicle = preset.vehicleType || prev.vehicleType;
        if (!preset.vehicleType && preset.peopleCount) {
          const num = parseInt(preset.peopleCount, 10);
          if (num <= 4) nextVehicle = "sedan";
          else if (num <= 7) nextVehicle = "7-seater";
          else if (num === 8) nextVehicle = "8-seater";
          else nextVehicle = "tempo-traveler";
        }

        return {
          ...prev,
          destinationDistrict: preset.destination || prev.destinationDistrict,
          tourPackage: preset.tourPackage || preset.destination || prev.tourPackage,
          peopleCount: nextPeople,
          vehicleType: nextVehicle,
          date: preset.date || prev.date,
        };
      });
    }
  }, [preset]);

  if (!isOpen) return null;

  const currentVehicle = vehicleRates.find((v) => v.type === formData.vehicleType) || vehicleRates[0];

  const handleWhatsAppSend = (e) => {
    e.preventDefault();
    const text =
      `Hello Hubbali Travel World! 👋%0A%0A` +
      `*Trip & Cab Booking Inquiry:*%0A` +
      `• *Name:* ${formData.name || "Traveler"}%0A` +
      `• *Phone:* ${formData.phone}%0A` +
      `• *Pickup District:* ${formData.pickupDistrict}%0A` +
      `• *Destination District (Karnataka):* ${formData.destinationDistrict}%0A` +
      `${formData.tourPackage ? `• *Tour Package:* ${formData.tourPackage}%0A` : ""}` +
      `• *Number of People:* ${formData.peopleCount} Travelers%0A` +
      `• *Vehicle Selected:* ${currentVehicle.name} (${currentVehicle.models})%0A` +
      `• *Standard Fare Rate:* ${currentVehicle.rateFormatted}%0A` +
      `• *Trip Type:* ${formData.tripType}%0A` +
      `• *Travel Date:* ${formData.date || "Flexible"}%0A` +
      `${formData.notes ? `• *Special Notes:* ${formData.notes}%0A` : ""}%0A` +
      `Please confirm driver & vehicle availability and share best quote!`;

    window.open(`https://wa.me/${companyInfo.whatsapp.replace("+", "")}?text=${text}`, "_blank");
    setSubmitted(true);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card modal-booking-wide" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          ✕
        </button>

        {submitted ? (
          <div className="modal-success">
            <div className="success-icon">✓</div>
            <h3>Booking Request Sent via WhatsApp!</h3>
            <p>Our Hubballi dispatch & tour desk will respond promptly with your driver details and fixed transparent quote.</p>
            <div className="modal-actions">
              <a href={`tel:${companyInfo.phoneRaw}`} className="btn btn-gold">
                📞 Call Us Directly ({companyInfo.phone})
              </a>
              <button className="btn btn-outline" onClick={onClose}>
                Close
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="modal-head">
              <span className="eyebrow">KARNATAKA ALL-DISTRICT CAB & TOUR BOOKING</span>
              <h3>Book Your Vehicle & Tour from Hubballi</h3>
              <p>
                Service available across <strong>all 31 districts of Karnataka</strong> with transparent per-km rates.
              </p>
            </div>

            {/* Rate Banner Strip */}
            <div className="rate-chips-banner">
              <div className={`rate-chip ${formData.vehicleType === "sedan" ? "active" : ""}`}>
                <span className="chip-v">Sedan (1-4 Ppl)</span>
                <span className="chip-p">Rs. 12 / Km</span>
              </div>
              <div className={`rate-chip ${formData.vehicleType === "7-seater" ? "active" : ""}`}>
                <span className="chip-v">7-Seater (5-7 Ppl)</span>
                <span className="chip-p">Rs. 15 / Km</span>
              </div>
              <div className={`rate-chip ${formData.vehicleType === "8-seater" ? "active" : ""}`}>
                <span className="chip-v">8-Seater (8 Ppl)</span>
                <span className="chip-p">Rs. 18 / Km</span>
              </div>
              <div className={`rate-chip ${formData.vehicleType === "tempo-traveler" ? "active" : ""}`}>
                <span className="chip-v">Tempo Traveler (9+)</span>
                <span className="chip-p">Rs. 22 / Km</span>
              </div>
            </div>

            <form className="modal-form" onSubmit={handleWhatsAppSend}>
              {/* Contact Details */}
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Patil"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Phone / WhatsApp Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              {/* Districts Selection - Covering all 31 districts */}
              <div className="form-row">
                <div className="form-group">
                  <label>Pickup District / Location</label>
                  <select
                    value={formData.pickupDistrict}
                    onChange={(e) => setFormData({ ...formData, pickupDistrict: e.target.value })}
                  >
                    <optgroup label="Primary Hubballi Hub">
                      <option value="Dharwad (Hubballi)">Dharwad (Hubballi - Airport / Railway Station / City)</option>
                    </optgroup>
                    <optgroup label="All Karnataka Districts (A-Z)">
                      {karnatakaDistricts.map((d) => (
                        <option key={`pickup-${d.id}`} value={d.name}>
                          {d.name}
                        </option>
                      ))}
                    </optgroup>
                  </select>
                </div>

                <div className="form-group">
                  <label>Destination District in Karnataka *</label>
                  <select
                    value={formData.destinationDistrict}
                    onChange={(e) => setFormData({ ...formData, destinationDistrict: e.target.value })}
                  >
                    <optgroup label="Popular Tourism & Pilgrimage Districts">
                      <option value="Vijayanagara (Hampi)">Vijayanagara (Hampi UNESCO Heritage)</option>
                      <option value="Uttara Kannada (Murudeshwar / Gokarna / Dandeli)">Uttara Kannada (Murudeshwar / Gokarna / Dandeli)</option>
                      <option value="Bagalkote (Badami / Pattadakal)">Bagalkote (Badami Cave Temples & Aihole)</option>
                      <option value="Mysuru (Mysore)">Mysuru (Mysore Palace & Chamundi)</option>
                      <option value="Kodagu (Coorg)">Kodagu (Coorg Hills & Coffee)</option>
                      <option value="Bengaluru Urban (Bangalore)">Bengaluru Urban (Bangalore)</option>
                      <option value="Belagavi (Belgaum)">Belagavi (Gokak Falls & Fort)</option>
                      <option value="Udupi">Udupi (Krishna Temple & Beaches)</option>
                    </optgroup>
                    <optgroup label="All 31 Districts of Karnataka (Full List)">
                      {karnatakaDistricts.map((d) => (
                        <option key={`dest-${d.id}`} value={d.name}>
                          {d.name} — {d.keyAttractions}
                        </option>
                      ))}
                    </optgroup>
                  </select>
                </div>
              </div>

              {/* People Selection & Auto Vehicle Mapping */}
              <div className="form-row">
                <div className="form-group">
                  <label>Number of People (Passengers) *</label>
                  <select
                    value={formData.peopleCount}
                    onChange={(e) => handlePeopleChange(e.target.value)}
                  >
                    <option value="1">1 Person (Auto Sedan - Rs. 12/Km)</option>
                    <option value="2">2 People (Auto Sedan - Rs. 12/Km)</option>
                    <option value="3">3 People (Auto Sedan - Rs. 12/Km)</option>
                    <option value="4">4 People (Auto Sedan - Rs. 12/Km)</option>
                    <option value="5">5 People (Auto 7-Seater - Rs. 15/Km)</option>
                    <option value="6">6 People (Auto 7-Seater - Rs. 15/Km)</option>
                    <option value="7">7 People (Auto 7-Seater - Rs. 15/Km)</option>
                    <option value="8">8 People (Auto 8-Seater - Rs. 18/Km)</option>
                    <option value="12">9 to 12 People (Tempo Traveler - Rs. 22/Km)</option>
                    <option value="17">13 to 17 People (Tempo Traveler - Rs. 22/Km)</option>
                    <option value="26">18 to 26 People (Large Tour Bus - Rs. 26/Km)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Vehicle Selected & Rate</label>
                  <select
                    value={formData.vehicleType}
                    onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
                  >
                    <option value="sedan">Sedan Vehicle (1-4 People) — Rs. 12 / Km</option>
                    <option value="7-seater">7-Seater Vehicle (5-7 People) — Rs. 15 / Km</option>
                    <option value="8-seater">8-Seater Vehicle (Up to 8 People) — Rs. 18 / Km</option>
                    <option value="tempo-traveler">Luxury AC Tempo Traveler (9+ People) — Rs. 22 / Km</option>
                  </select>
                </div>
              </div>

              {/* Live Rate Summary Callout */}
              <div className="active-vehicle-card">
                <div className="veh-thumb">
                  <img src={currentVehicle.image} alt={currentVehicle.name} />
                </div>
                <div className="veh-details">
                  <div className="veh-header">
                    <h4>{currentVehicle.name}</h4>
                    <span className="veh-price-badge">{currentVehicle.rateFormatted}</span>
                  </div>
                  <p className="veh-models">🚘 {currentVehicle.models}</p>
                  <p className="veh-capacity">
                    👥 Capacity: <strong>{currentVehicle.capacity}</strong> • 🧳 Luggage Roof Carrier Included
                  </p>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Travel Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Trip Type</label>
                  <select
                    value={formData.tripType}
                    onChange={(e) => setFormData({ ...formData, tripType: e.target.value })}
                  >
                    <option value="Round Trip (Outstation Tour)">Round Trip (Outstation Tour)</option>
                    <option value="One Way Drop">One Way Drop</option>
                    <option value="Multi-Day Pilgrimage / Sightseeing">Multi-Day Pilgrimage / Sightseeing</option>
                    <option value="Airport / Station Pickup & Drop">Airport / Station Pickup & Drop</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Special Requests or Specific Route Details (Optional)</label>
                <textarea
                  rows="2"
                  placeholder="e.g. Pickup at Hubballi Junction at 7:30 AM, need baby seat, temple darshan timing..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                ></textarea>
              </div>

              <div className="modal-footer-btns">
                <button type="submit" className="btn btn-whatsapp">
                  <span>💬 Book on WhatsApp with Fixed Rate</span>
                </button>
                <a href={`tel:${companyInfo.phoneRaw}`} className="btn btn-dark">
                  📞 Call {companyInfo.phone}
                </a>
              </div>
              <small className="form-privacy">
                ✓ Guaranteed vehicle availability across all 31 districts of Karnataka. No hidden surge charges.
              </small>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
