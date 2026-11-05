import { useEffect, useRef } from "react";

/**
 * Adds the "in" class to every .reveal element inside the ref'd container once it scrolls into view.
 * Includes fallback logic to guarantee elements are revealed even if IntersectionObserver fails or is slow.
 */
export default function useReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const elements = root.querySelectorAll(".reveal");

    // Fallback if IntersectionObserver is unsupported
    if (typeof window === "undefined" || !window.IntersectionObserver) {
      elements.forEach((el) => el.classList.add("in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px 50px 0px" }
    );

    elements.forEach((el) => io.observe(el));

    // Safety timeout: automatically ensure all content is visible within 1.2 seconds
    const timer = setTimeout(() => {
      elements.forEach((el) => el.classList.add("in"));
    }, 1200);

    return () => {
      clearTimeout(timer);
      io.disconnect();
    };
  }, []);

  return ref;
}
