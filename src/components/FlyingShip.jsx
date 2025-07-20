import React, { useEffect, useState } from 'react';

const ships = [
  '/images/giantship.png',
  '/images/nave5.png',
];

const FlyingShip = () => {
  const [flyKey, setFlyKey] = useState(0);
  const [currentShip, setCurrentShip] = useState(ships[0]);
  const [topOffset, setTopOffset] = useState(0);

  // Cambiar nave cada 25 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      const nextShip = ships[Math.floor(Math.random() * ships.length)];
      setCurrentShip(nextShip);
      setFlyKey((prev) => prev + 1);
    }, 25000);

    return () => clearInterval(interval);
  }, []);

  // Detectar topOffset de TokenInfoCard incluso si tarda en renderizar
  useEffect(() => {
    const tryGetOffset = (attempt = 0) => {
      const el = document.getElementById('TokenInfoCard');
      if (el) {
        const rect = el.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        setTopOffset(rect.top + scrollTop);
      } else if (attempt < 10) {
        // Reintenta cada 300ms hasta 10 veces
        setTimeout(() => tryGetOffset(attempt + 1), 300);
      }
    };

    tryGetOffset();
  }, []);

  return (
    <div
      key={flyKey}
      className="pointer-events-none fixed z-[-10] left-0 w-full overflow-hidden"
      style={{
        top: `${topOffset}px`,
        height: '1000px',
      }}
    >
      <img
        src={currentShip}
        alt="flying ship"
        className="absolute opacity-30"
        style={{
          left: '50%',
          top: '0px',
          width: '1000px',
          transform: 'translateX(-50%) scale(0.6)',
          animation: 'fly-vertical 13s ease-in-out forwards',
        }}
      />
    </div>
  );
};

export default FlyingShip;
