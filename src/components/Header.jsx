import { useEffect, useState } from "react";
import { navLinks, companyInfo } from "../data";

export default function Header({ onOpenBooking }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={scrolled ? "scrolled" : ""}>
      <div className="container nav">
        <a href="#hero" className="logo">
          <div className="logo-mark">H</div>
          <div>
            <b>HUBBALI</b>
            <small>TRAVEL WORLD</small>
          </div>
        </a>

        <nav className={`menu ${open ? "open" : ""}`}>
          {navLinks.map((l, i) => (
            <a
              key={l.label}
              href={l.href}
              className={i === 0 ? "active" : ""}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <div className="mobile-only-btns">
            <a href={`tel:${companyInfo.phoneRaw}`} className="btn btn-outline-dark">
              📞 {companyInfo.phone}
            </a>
            <button
              onClick={() => {
                setOpen(false);
                onOpenBooking?.();
              }}
              className="btn btn-gold"
            >
              Plan Your Trip →
            </button>
          </div>
        </nav>

        <div className="nav-right">
          <a href={`tel:${companyInfo.phoneRaw}`} className="phone-link">
            <span className="phone-icon">📞</span>
            <div className="phone-text">
              <span className="phone-label">Direct Call / WhatsApp</span>
              <strong>{companyInfo.phone}</strong>
            </div>
          </a>
          <button onClick={() => onOpenBooking?.()} className="btn btn-gold nav-cta-btn">
            Plan Your Trip <span className="arrow">→</span>
          </button>
          <button
            className="burger"
            aria-label="Toggle navigation menu"
            onClick={() => setOpen(!open)}
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </div>
    </header>
  );
}
