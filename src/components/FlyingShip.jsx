import React, { useEffect, useState } from 'react';

const ships = [
  '/images/giantship.png',
  '/images/nave5.png',
];

const FlyingShip = () => {
  const [flyKey, setFlyKey] = useState(0);
  const [currentShip, setCurrentShip] = useState(ships[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextShip = ships[Math.floor(Math.random() * ships.length)];
      setCurrentShip(nextShip);
      setFlyKey((prev) => prev + 1);
    }, 25000); // Cada 25 segundos

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      key={flyKey}
      className="pointer-events-none fixed z-0 inset-0 overflow-hidden"
    >
      <img
        src={currentShip}
        alt="flying ship"
        className="absolute opacity-30"
        style={{
          left: '50%',
          bottom: '-800px',
          width: '1000px',
          transform: 'translateX(-50%) scale(0.6)',
          animation: 'fly-vertical 13s ease-in-out forwards',
        }}
      />
    </div>
  );
};

export default FlyingShip;
