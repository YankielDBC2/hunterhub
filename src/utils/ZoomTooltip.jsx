import React from 'react';

const ZoomTooltip = ({ src, visible, x, y }) => {
  if (!visible) return null;

  // Tamaño estimado del tooltip
  const width = 300;
  const height = 300;
  const padding = 20;

  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;

  // Reubicación dinámica si se sale por la derecha o abajo
  const adjustedLeft = x + width + padding > screenWidth ? x - width - padding : x + padding;
  const adjustedTop = y + height + padding > screenHeight ? y - height - padding : y + padding;

  return (
    <div
      className="fixed z-50 pointer-events-none"
      style={{
        top: adjustedTop,
        left: adjustedLeft,
      }}
    >
      <div className="w-[400px] h-[400px] p-1 rounded-lg border border-cyan-400 bg-black bg-opacity-80 backdrop-blur-md shadow-xl">
        <img
          src={src}
          alt="zoom"
          className="w-full h-full object-contain rounded-md"
        />
      </div>
    </div>
  );
};

export default ZoomTooltip;
