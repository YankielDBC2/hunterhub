import React, { useEffect, useState } from "react";
import "./AdventureSection.css";

const AdventureSection = () => {
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    const spawnLeaf = () => {
      const leafCount = Math.floor(Math.random() * 3) + 1; // 1 a 3 hojas por ráfaga

      const newLeaves = Array.from({ length: leafCount }, (_, i) => ({
        id: Date.now() + i,
        src: `/images/hoja_${Math.floor(Math.random() * 4) + 1}.png`,
        top: `${50 + Math.random() * 25}%`, // 50% a 75% vertical
        duration: 5000 + Math.random() * 4000, // entre 5s y 9s
        rotation: Math.random() > 0.5 ? 180 : -180,
        offsetY: Math.floor(Math.random() * 60 - 30), // -30px a +30px de variación vertical
      }));

      setLeaves((prev) => [...prev, ...newLeaves]);

      // Eliminar hojas pasados 10s
      setTimeout(() => {
        setLeaves((prev) =>
          prev.filter((leaf) => !newLeaves.some((n) => n.id === leaf.id))
        );
      }, 10000);
    };

    const interval = setInterval(spawnLeaf, 12000); // Cada 12s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[1000px] pb-40 overflow-hidden">
      {/* Imagen de fondo con fade */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center z-0"
        style={{
          backgroundImage: "url('/images/AdventureSection-bg.png')",
          WebkitMaskImage: "linear-gradient(to bottom, transparent -5%, black 60%, black 100%)",
          maskImage: "linear-gradient(to bottom, transparent 0%, black 90%, black 100%)",
        }}
      />

      {/* 🌿 Hojas animadas desde fuera de pantalla */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-visible">
        {leaves.map((leaf) => (
          <img
            key={leaf.id}
            src={leaf.src}
            className="absolute leaf-float"
            style={{
              top: leaf.top,
              right: '0',
              animationDuration: `${leaf.duration}ms`,
              transform: `translateX(120vw) translateY(${leaf.offsetY}px) rotate(0deg)`,
              '--rotate': `${leaf.rotation}deg`,
            }}
            alt="hoja"
          />
        ))}
      </div>

      {/* Contenido visible */}
      <div className="relative z-20 w-full h-full flex items-center justify-center">
        <h2 className="text-4xl font-bold">🌌 El chisme Comienza Aquí</h2>
      </div>
    </div>
  );
};

export default AdventureSection;
