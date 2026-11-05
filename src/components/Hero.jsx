import React, { useState } from "react";
import { companyInfo, karnatakaDistricts, vehicleRates } from "../data";

export default function Hero({ onOpenBooking, onOpenPhoto }) {
  const [destination, setDestination] = useState("Vijayanagara (Hampi)");
  const [people, setPeople] = useState("4");
  const [date, setDate] = useState("");

  const getVehicleForPeople = (count) => {
    const num = parseInt(count, 10);
    if (num <= 4) return vehicleRates[0]; // sedan (Rs.12/km)
    if (num <= 7) return vehicleRates[1]; // 7-seater (Rs.15/km)
    if (num === 8) return vehicleRates[2]; // 8-seater (Rs.18/km)
    return vehicleRates[3]; // tempo traveler (Rs.22/km)
  };

  const currentVehicle = getVehicleForPeople(people) || vehicleRates[0];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onOpenBooking?.({
      destination,
      serviceType: currentVehicle.name,
      peopleCount: people,
      vehicleType: currentVehicle.type,
      date,
    });
  };

  return (
    <>
      <div className="hero" id="hero">
        <div className="hero-overlay" />
        <div className="container hero-container">
          <div className="hero-inner">
            <div className="hero-pill">
              <span className="pill-star">★</span>
              <span>4.9 / 5 Rating • All 31 Karnataka Districts Covered</span>
            </div>

            <h1 className="hero-title">
              Your Gateway to <span className="highlight-text">Karnataka & Beyond</span>
            </h1>

            <p className="hero-desc">
              Experience the timeless ruins of <strong>Hampi</strong>, sacred waters of{" "}
              <strong>Murudeshwar</strong>, and peaceful river coracles. Sanitized tourist cabs at fixed rates:{" "}
              <strong>Sedan @ Rs. 12/Km</strong> • <strong>7-Seater @ Rs. 15/Km</strong> • <strong>8-Seater @ Rs. 18/Km</strong>.
            </p>

            <div className="hero-btns">
              <button onClick={() => onOpenBooking?.()} className="btn btn-gold hero-btn-main">
                <span>Book Vehicle / Tour</span>
                <span className="arrow">→</span>
              </button>

              <button
                type="button"
                className="btn btn-glass-hero"
                onClick={() =>
                  onOpenPhoto?.({
                    src: "/images/hero-coracle-sunset.jpg",
                    thumbTitle: "Serene Coracle Boat at Sunset",
                    categoryLabel: "Real Hampi Moments",
                    location: "River Tungabhadra, Hampi",
                    caption: "Pure magic on the water at sunset. Authentic moments captured during our guided tours.",
                  })
                }
              >
                <span className="play-icon">▶</span>
                <span>View Real Moments</span>
              </button>
            </div>

            <div className="hero-stats">
              <div className="stat-card">
                <strong>{companyInfo.yearsExp}</strong>
                <span>Years of Excellence</span>
              </div>
              <div className="stat-divider" />
              <div className="stat-card">
                <strong>31</strong>
                <span>Karnataka Districts</span>
              </div>
              <div className="stat-divider" />
              <div className="stat-card">
                <strong>Rs. 12/Km</strong>
                <span>Starting Sedan Rate</span>
              </div>
              <div className="stat-divider" />
              <div className="stat-card">
                <strong>{companyInfo.rating} ★</strong>
                <span>Google Verified Reviews</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container search-bar-container">
        <form className="search-box" onSubmit={handleSearchSubmit}>
          <div className="search-field">
            <span className="field-icon">📍</span>
            <div>
              <label>Destination (All Karnataka)</label>
              <select value={destination} onChange={(e) => setDestination(e.target.value)}>
                <optgroup label="Popular Destinations">
                  <option value="Vijayanagara (Hampi)">Vijayanagara (Hampi Heritage)</option>
                  <option value="Uttara Kannada (Murudeshwar / Gokarna / Dandeli)">Uttara Kannada (Murudeshwar & Coast)</option>
                  <option value="Bagalkote (Badami / Pattadakal)">Bagalkote (Badami Cave Temples)</option>
                  <option value="Mysuru (Mysore)">Mysuru (Mysore Palace)</option>
                  <option value="Kodagu (Coorg)">Kodagu (Coorg Hills)</option>
                  <option value="Bengaluru Urban (Bangalore)">Bengaluru Urban (Bangalore)</option>
                </optgroup>
                <optgroup label="All 31 Districts of Karnataka">
                  {karnatakaDistricts.map((d) => (
                    <option key={`hero-${d.id}`} value={d.name}>
                      {d.name}
                    </option>
                  ))}
                </optgroup>
              </select>
            </div>
          </div>

          <div className="search-field">
            <span className="field-icon">👥</span>
            <div>
              <label>Number of People</label>
              <select value={people} onChange={(e) => setPeople(e.target.value)}>
                <option value="2">1-2 People (Sedan - Rs.12/Km)</option>
                <option value="4">3-4 People (Sedan - Rs.12/Km)</option>
                <option value="6">5-6 People (7-Seater - Rs.15/Km)</option>
                <option value="7">7 People (7-Seater - Rs.15/Km)</option>
                <option value="8">8 People (8-Seater - Rs.18/Km)</option>
                <option value="12">9-12 People (Tempo Traveler - Rs.22/Km)</option>
                <option value="17">13-17 People (Tempo Traveler - Rs.22/Km)</option>
              </select>
            </div>
          </div>

          <div className="search-field">
            <span className="field-icon">🚗</span>
            <div>
              <label>Vehicle & Fixed Rate</label>
              <div className="hero-rate-tag">
                <strong>{currentVehicle.name}</strong>
                <span className="rate-badge-sm">{currentVehicle.rateFormatted}</span>
              </div>
            </div>
          </div>

          <button type="submit" className="btn btn-gold search-submit-btn">
            <span>Check & Book ({currentVehicle.rateFormatted}) →</span>
          </button>
        </form>
      </div>
    </>
  );
}
