import React from "react";

const AdventureSection = () => {
  return (
    <div className="relative w-full h-[1000px] overflow-hidden">
      {/* Imagen de fondo con fade vertical (arriba oscuro → abajo visible) */}
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center z-0"
        style={{
          backgroundImage: "url('/images/AdventureSection-bg.png')",
          WebkitMaskImage: "linear-gradient(to bottom, transparent -5%, black 60%, black 100%)",
          maskImage: "linear-gradient(to bottom, transparent 0%, black 90%, black 100%)",
        }}
      />

      {/* Contenido encima */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        {/* Aquí puedes poner tus componentes encima */}
        <h2 className="text-4xl font-bold">🌌 El chisme Comienza Aquí</h2>
      </div>
    </div>
  );
};

export default AdventureSection;
