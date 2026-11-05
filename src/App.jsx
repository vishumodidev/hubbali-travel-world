import React, { useState } from "react";
import useReveal from "./hooks/useReveal";
import { galleryPhotos } from "./data";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Destinations from "./components/Destinations";
import Packages from "./components/Packages";
import Fleet from "./components/Fleet";
import Gallery from "./components/Gallery";
import About from "./components/About";
import WhyUs from "./components/WhyUs";
import Testimonials from "./components/Testimonials";
import CTA from "./components/CTA";
import Footer from "./components/Footer";
import BookingModal from "./components/BookingModal";
import LightboxModal from "./components/LightboxModal";

export default function App() {
  const ref = useReveal();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [bookingPreset, setBookingPreset] = useState({ destination: "", serviceType: "" });
  const [lightboxPhoto, setLightboxPhoto] = useState(null);

  const handleOpenBooking = (preset = {}) => {
    setBookingPreset(preset);
    setIsBookingOpen(true);
  };

  const handleOpenPhoto = (photo) => {
    setLightboxPhoto(photo);
  };

  const handleNextPhoto = () => {
    if (!lightboxPhoto) return;
    const currentIndex = galleryPhotos.findIndex((p) => p.src === lightboxPhoto.src);
    if (currentIndex !== -1) {
      const nextIndex = (currentIndex + 1) % galleryPhotos.length;
      setLightboxPhoto(galleryPhotos[nextIndex]);
    }
  };

  const handlePrevPhoto = () => {
    if (!lightboxPhoto) return;
    const currentIndex = galleryPhotos.findIndex((p) => p.src === lightboxPhoto.src);
    if (currentIndex !== -1) {
      const prevIndex = (currentIndex - 1 + galleryPhotos.length) % galleryPhotos.length;
      setLightboxPhoto(galleryPhotos[prevIndex]);
    }
  };

  return (
    <div ref={ref} className="app-root">
      <Header onOpenBooking={() => handleOpenBooking()} />
      <main>
        <Hero
          onOpenBooking={handleOpenBooking}
          onOpenPhoto={handleOpenPhoto}
        />
        <Destinations
          onOpenBooking={handleOpenBooking}
          onOpenPhoto={handleOpenPhoto}
        />
        <Packages
          onOpenBooking={handleOpenBooking}
          onOpenPhoto={handleOpenPhoto}
        />
        <Fleet
          onOpenBooking={handleOpenBooking}
          onOpenPhoto={handleOpenPhoto}
        />
        <Gallery onSelectPhoto={handleOpenPhoto} />
        <About
          onOpenBooking={handleOpenBooking}
          onOpenPhoto={handleOpenPhoto}
        />
        <WhyUs />
        <Testimonials />
        <CTA onOpenBooking={handleOpenBooking} />
      </main>
      <Footer onOpenBooking={() => handleOpenBooking()} />

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preset={bookingPreset}
      />

      <LightboxModal
        photo={lightboxPhoto}
        onClose={() => setLightboxPhoto(null)}
        onNext={handleNextPhoto}
        onPrev={handlePrevPhoto}
      />
    </div>
  );
}
