import React, { useEffect } from "react";

export default function LightboxModal({ photo, onClose, onNext, onPrev }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext?.();
      if (e.key === "ArrowLeft") onPrev?.();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onNext, onPrev]);

  if (!photo) return null;

  return (
    <div className="lightbox-backdrop" onClick={onClose}>
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <button className="lightbox-close" onClick={onClose} aria-label="Close Lightbox">
          ✕
        </button>

        {onPrev && (
          <button className="lightbox-nav prev" onClick={onPrev} aria-label="Previous photo">
            ‹
          </button>
        )}

        <div className="lightbox-body">
          <div className="lightbox-image-wrap">
            <img src={photo.src} alt={photo.thumbTitle || "Hubbali Travel World moment"} className="lightbox-img" />
          </div>
          <div className="lightbox-info">
            <span className="lightbox-badge">{photo.categoryLabel || "Real Moments"}</span>
            <h3>{photo.thumbTitle}</h3>
            {photo.location && <p className="lightbox-loc">📍 {photo.location}</p>}
            {photo.caption && <p className="lightbox-caption">{photo.caption}</p>}
          </div>
        </div>

        {onNext && (
          <button className="lightbox-nav next" onClick={onNext} aria-label="Next photo">
            ›
          </button>
        )}
      </div>
    </div>
  );
}

