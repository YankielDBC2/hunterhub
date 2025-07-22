import { useEffect, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  let scrollTimeout;

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;

      // Mostrar el botón si bajamos suficiente
      if (scrollTop > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Marcar como en scroll y resetear temporizador
      setIsScrolling(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 3000); // 3 segundos sin moverse = ocultar
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const show = isVisible && isScrolling;

  return (
    show && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 z-[9999] p-3 bg-gradient-to-br from-red-600 via-red-500 to-red-700 hover:from-red-500 hover:to-red-600 text-white rounded-full shadow-lg animate-floating animate-coin-flip transition-opacity duration-500 opacity-100"
        title="Go to top"
      >
        <FaArrowUp className="text-lg" />
      </button>
    )
  );
};

export default ScrollToTopButton;
