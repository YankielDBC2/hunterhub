import { useEffect, useState } from "react";
import { FaChartBar } from "react-icons/fa";

const ScrollToEconomyButton = () => {
  const [isVisible, setIsVisible] = useState(true); // visible al cargar
  const [isScrolling, setIsScrolling] = useState(true); // para autoocultarse
  let scrollTimeout;

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const header = document.querySelector("header");
      const economySection = document.getElementById("economic-overview");

      const headerVisible = header?.getBoundingClientRect().bottom > 100;

      const isInEconomyView =
        economySection &&
        economySection.getBoundingClientRect().top < window.innerHeight &&
        economySection.getBoundingClientRect().bottom > 0;

      // Mostrar el botón si NO estás en el header ni en la sección
      setIsVisible(!headerVisible && !isInEconomyView);

      // Auto-ocultar después de 3 segundos sin scroll
      setIsScrolling(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 3000);
    };

    // Mostrar al principio
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  // Scroll personalizado más lento
  const scrollToEconomy = () => {
    const target = document.getElementById("economic-overview");
    if (!target) return;

    const targetY = target.getBoundingClientRect().top + window.scrollY - 100;
    const startY = window.scrollY;
    const distance = targetY - startY;
    const duration = 1200;
    let startTime = null;

    const easeInOutQuad = (t) =>
      t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

    const step = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const ease = easeInOutQuad(progress);

      window.scrollTo(0, startY + distance * ease);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  };

  const shouldShow = isVisible && isScrolling;

  return (
    shouldShow && (
      <button
        onClick={scrollToEconomy}
        className="fixed bottom-20 right-6 z-[9999] p-3 bg-gradient-to-br from-cyan-600 via-cyan-500 to-cyan-700 hover:from-cyan-500 hover:to-cyan-600 text-white rounded-full shadow-lg transition-transform duration-300 animate-bounce"
        title="Jump to Economic Overview"
      >
        <FaChartBar className="text-lg" />
      </button>
    )
  );
};

export default ScrollToEconomyButton;
