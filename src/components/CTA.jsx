import React from "react";
import { companyInfo } from "../data";

export default function CTA({ onOpenBooking }) {
  return (
    <section className="cta-section" id="contact">
      <div className="container">
        <div className="cta-banner reveal">
          <div className="cta-overlay" />
          <div className="cta-content">
            <span className="eyebrow eyebrow-light">READY FOR YOUR NEXT ADVENTURE?</span>
            <h2 className="cta-title">Let's Plan Your Dream Karnataka Journey Together</h2>
            <p className="cta-desc">
              Whether you need a private AC cab from Hubballi, a customized Hampi & Coracle package, or a luxury
              Tempo Traveler for your family or temple group, we guarantee the best rates and exceptional service.
            </p>

            <div className="cta-action-buttons">
              <button onClick={() => onOpenBooking?.()} className="btn btn-gold btn-lg">
                <span>Start Planning Now</span>
                <span className="arrow">→</span>
              </button>

              <a
                href={`https://wa.me/${companyInfo.whatsapp.replace("+", "")}?text=Hello%20Hubbali%20Travel%20World!%20I%20would%20like%20to%20plan%20a%20trip.`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-whatsapp-lg"
              >
                <span>💬 Chat on WhatsApp</span>
              </a>

              <a href={`tel:${companyInfo.phoneRaw}`} className="btn btn-glass-white">
                <span>📞 Call {companyInfo.phone}</span>
              </a>
            </div>

            <div className="cta-trust-items">
              <span>✓ Instant Free Quote</span>
              <span>✓ 100% Customized Plans</span>
              <span>✓ Verified Local Chauffeurs</span>
              <span>✓ Zero Hidden Surcharges</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
