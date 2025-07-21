import React, { useEffect, useState } from "react";
import "./AdventureSectionMobile.css";
import { useSection } from "../../context/SectionContext.jsx";

const AdventureSectionMobile = () => {
  const [leaves, setLeaves] = useState([]);
  const { setCurrentSection } = useSection(); // 👈 obtenemos setter del contexto

  useEffect(() => {
    // 👇 activamos la sección Adventure al montar
    setCurrentSection("adventure");

    const spawnLeaf = () => {
      const leafCount = Math.floor(Math.random() * 3) + 1;

      const newLeaves = Array.from({ length: leafCount }, (_, i) => ({
        id: Date.now() + i,
        src: `/images/hoja_${Math.floor(Math.random() * 4) + 1}.png`,
        top: `${50 + Math.random() * 25}%`,
        duration: 5000 + Math.random() * 4000,
        rotation: Math.random() > 0.5 ? 180 : -180,
        offsetY: Math.floor(Math.random() * 60 - 30),
      }));

      setLeaves((prev) => [...prev, ...newLeaves]);

      setTimeout(() => {
        setLeaves((prev) =>
          prev.filter((leaf) => !newLeaves.some((n) => n.id === leaf.id))
        );
      }, 10000);
    };

    const interval = setInterval(spawnLeaf, 12000);
    return () => {
      clearInterval(interval);
      setCurrentSection(null); // 👈 reseteamos al salir
    };
  }, [setCurrentSection]);

  return (
    <div className="relative w-full h-[1000px] pb-60 overflow-hidden">
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center z-0"
        style={{
          backgroundImage: "url('/images/AdventureSection-bg.png')",
          WebkitMaskImage: "linear-gradient(to bottom, transparent -5%, black 21%, black 90%)",
          maskImage: "linear-gradient(to bottom, transparent 0%, black 70, black 100%)",
        }}
      />

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

      <div className="relative z-20 w-full h-full flex items-center justify-center">
        <h2 className="text-4xl font-bold"> </h2>
      </div>

      {/* 🧬 Imagen de Razas - editable con props de posición y tamaño */}
      <img
        src="/images/razas03.png"
        alt="razas"
        className="absolute razas-image z-10 transition-all duration-500 ease-in-out"
        style={{
          top: "calc(100% - 100px)", // La imagen estará 100px debajo del contenedor, más cerca del footer
          left: "10%",
          transform: "translate(-10%, -70%)", // Ajuste para centrar la imagen
          width: "768px",
          height: "340px",
        }}
      />

    </div>
  );
};

export default AdventureSectionMobile;
