import React, { useEffect, useState } from "react";
import { companyInfo } from "../data";
import {
  InstagramIcon,
  FacebookIcon,
  WhatsAppIcon,
  MapPinIcon,
  GoogleGIcon,
} from "./SocialIcons";

export default function Footer({ onOpenBooking }) {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <footer className="footer-main">
        <div className="container">
          <div className="f-grid">
            <div className="f-col f-brand">
              <a href="#hero" className="logo footer-logo">
                <div className="logo-mark">H</div>
                <div>
                  <b>HUBBALI</b>
                  <small>TRAVEL WORLD</small>
                </div>
              </a>
              <p className="f-tagline">{companyInfo.tagline}</p>
              <p className="f-bio">
                Premier tour operators and verified cab rental service based in Hubballi, Karnataka.
                Specializing in Hampi heritage, Dandeli adventures, coastal temples, and customized South India tours.
              </p>
              <div className="f-socials">
                <a
                  href={`https://wa.me/${companyInfo.whatsapp.replace("+", "")}`}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="WhatsApp"
                  title="Chat on WhatsApp"
                  className="soc-btn soc-wa"
                >
                  <WhatsAppIcon size={18} />
                </a>
                <a
                  href={companyInfo.instagram}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  title="Follow us on Instagram @hubbalitravelworld"
                  className="soc-btn soc-ig"
                >
                  <InstagramIcon size={18} />
                </a>
                <a
                  href={companyInfo.facebook}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Facebook"
                  title="Connect on Facebook"
                  className="soc-btn soc-fb"
                >
                  <FacebookIcon size={18} />
                </a>
                <a
                  href={`tel:${companyInfo.phoneRaw}`}
                  aria-label="Phone"
                  title={`Call ${companyInfo.phone}`}
                  className="soc-btn soc-phone"
                >
                  📞
                </a>
                <a
                  href={`mailto:${companyInfo.email}`}
                  aria-label="Email"
                  title={`Email ${companyInfo.email}`}
                  className="soc-btn soc-email"
                >
                  ✉
                </a>
                <a
                  href={companyInfo.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Location on Google Maps"
                  title="View Hubbali Travel World on Google Maps"
                  className="soc-btn soc-map"
                >
                  <MapPinIcon size={18} />
                </a>
              </div>
            </div>

            <div className="f-col">
              <h5>Quick Links</h5>
              <ul className="f-links">
                <li><a href="#hero">Home</a></li>
                <li><a href="#destinations">Popular Destinations</a></li>
                <li><a href="#packages">Curated Packages</a></li>
                <li><a href="#fleet">Tour Fleet & Cabs</a></li>
                <li><a href="#gallery">Real Photo Gallery</a></li>
                <li><a href="#about">About Hubbali Travel World</a></li>
                <li><a href="#testimonials">Customer Reviews</a></li>
                <li><a href="#contact">Contact & Inquiry</a></li>
              </ul>
            </div>

            <div className="f-col">
              <h5>Popular Tours</h5>
              <ul className="f-links">
                <li><a href="#packages">Hampi & Coracle Tour (3D/2N)</a></li>
                <li><a href="#packages">Murudeshwar & Gokarna Coastal Trail</a></li>
                <li><a href="#packages">Dandeli White Water Rafting</a></li>
                <li><a href="#packages">South India Grand Temple Circuit</a></li>
                <li><a href="#packages">Badami, Aihole & Pattadakal</a></li>
                <li><a href="#packages">Goa Beach & Dudhsagar Excursion</a></li>
              </ul>
            </div>

            <div className="f-col">
              <h5>Fleet & Rentals</h5>
              <ul className="f-links">
                <li><a href="#fleet">Airport Pickup & Drop (HBX)</a></li>
                <li><a href="#fleet">Railway Station Taxi (Hubballi)</a></li>
                <li><a href="#fleet">Outstation Tourist Cabs</a></li>
                <li><a href="#fleet">12/17/26 Seater Tempo Travelers</a></li>
                <li><a href="#fleet">Corporate & Wedding Transport</a></li>
              </ul>
            </div>

            <div className="f-col f-contact">
              <h5>Get in Touch</h5>
              <div className="f-contact-items">
                <div className="f-contact-item">
                  <span className="icon">📞</span>
                  <div>
                    <small>Direct Phone & WhatsApp</small>
                    <a href={`tel:${companyInfo.phoneRaw}`}>{companyInfo.phone}</a>
                  </div>
                </div>

                <div className="f-contact-item">
                  <span className="icon">✉️</span>
                  <div>
                    <small>Email Support</small>
                    <a href={`mailto:${companyInfo.email}`}>{companyInfo.email}</a>
                  </div>
                </div>

                <div className="f-contact-item">
                  <span className="icon">⭐</span>
                  <div>
                    <small>Google Verified Rating</small>
                    <a
                      href={companyInfo.googleReviewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="google-footer-link"
                      style={{ color: "#ffb703", textDecoration: "none", fontWeight: "600", display: "inline-flex", alignItems: "center", gap: "6px" }}
                    >
                      <GoogleGIcon size={16} />
                      <span>{companyInfo.rating} ★ ({companyInfo.reviewsCount} Google Reviews)</span>
                    </a>
                  </div>
                </div>

                <div className="f-contact-item">
                  <span className="icon">🌐</span>
                  <div>
                    <small>Follow on Social Media</small>
                    <div style={{ display: "flex", gap: "10px", marginTop: "3px" }}>
                      <a
                        href={companyInfo.instagram}
                        target="_blank"
                        rel="noreferrer"
                        style={{ color: "rgba(255,255,255,0.85)", textDecoration: "none", fontSize: "0.85rem", display: "inline-flex", alignItems: "center", gap: "4px" }}
                      >
                        <InstagramIcon size={14} /> Instagram
                      </a>
                      <span style={{ color: "rgba(255,255,255,0.3)" }}>•</span>
                      <a
                        href={companyInfo.facebook}
                        target="_blank"
                        rel="noreferrer"
                        style={{ color: "rgba(255,255,255,0.85)", textDecoration: "none", fontSize: "0.85rem", display: "inline-flex", alignItems: "center", gap: "4px" }}
                      >
                        <FacebookIcon size={14} /> Facebook
                      </a>
                    </div>
                  </div>
                </div>

                <div className="f-contact-item">
                  <span className="icon">📍</span>
                  <div>
                    <small>Location & Head Office</small>
                    <a
                      href={companyInfo.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="maps-link"
                      style={{ color: "inherit", textDecoration: "none", display: "block" }}
                    >
                      <span>{companyInfo.address}</span>
                      <span style={{ display: "block", marginTop: "4px", color: "var(--color-gold, #ffb703)", fontSize: "0.82rem", fontWeight: "600" }}>
                        📍 Open in Google Maps ↗
                      </span>
                    </a>
                  </div>
                </div>
              </div>

              <button onClick={() => onOpenBooking?.()} className="btn btn-gold btn-sm mt-3 w-100">
                Quick Quote Request →
              </button>
            </div>
          </div>

          <div className="copy">
            <span>© {new Date().getFullYear()} Hubbali Travel World. All Rights Reserved.</span>
            <span>Crafted for Travelers across Karnataka & India | Government Reg. Tour Operators</span>
          </div>
        </div>
      </footer>

      {/* Floating Action Buttons */}
      <a
        href={`https://wa.me/${companyInfo.whatsapp.replace("+", "")}?text=Hello%20Hubbali%20Travel%20World!%20I%20would%20like%20to%20inquire%20about%20a%20tour%20package%20/%20cab.`}
        target="_blank"
        rel="noreferrer"
        className="floating-whatsapp"
        aria-label="Chat on WhatsApp"
      >
        <span className="wa-icon">💬</span>
        <span className="wa-label">WhatsApp Us</span>
      </a>

      <button
        onClick={scrollToTop}
        className={`totop ${showTop ? "show" : ""}`}
        aria-label="Back to top"
      >
        ↑
      </button>
    </>
  );
}
