import React, { useEffect, useRef } from 'react';

const allImages = [
  { src: '/images/Techpass.png', size: 70 },
  { src: '/images/mechapass.png', size: 70 },
  { src: '/images/pala.png', size: 70 },
  { src: '/images/flotar1.png', size: 70 },
  { src: '/images/flotar2.png', size: 70 },
  { src: '/images/flotar3.png', size: 70 },
];

const MIN_DISTANCE = 120;
const MAX_FLOATING = 3;

const FloatingObjects = () => {
  const containerRef = useRef(null);
  const objects = useRef([]);
  const velocities = useRef([]);
  const rotationAngles = useRef([]);
  const opacities = useRef([]);
  const timers = useRef([]);
  const scaleFactors = useRef([]);
  const scaleDirections = useRef([]);

  const generatePosition = (width, height, others, size) => {
    let tries = 0;
    while (tries < 1000) {
      const x = Math.random() * (width - size);
      const y = Math.random() * (height - size);
      const isFar = others.every((o) => Math.hypot(x - o.x, y - o.y) > MIN_DISTANCE);
      if (isFar) return { x, y };
      tries++;
    }
    return { x: Math.random() * width, y: Math.random() * height };
  };

  const spawnNewImage = (index, el) => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const positions = objects.current
      .filter((_, i) => i !== index && objects.current[i])
      .map((_, i) => {
        const style = window.getComputedStyle(objects.current[i]);
        return {
          x: parseFloat(style.left) || 0,
          y: parseFloat(style.top) || 0,
        };
      });

    const img = allImages[Math.floor(Math.random() * allImages.length)];
    el.src = img.src;
    el.style.width = `${img.size}px`;

    const pos = generatePosition(width, height, positions, img.size);

    velocities.current[index] = {
      dx: (Math.random() - 0.5) * 0.2,
      dy: (Math.random() - 0.5) * 0.2,
      rotSpeed: (Math.random() - 0.5) * 0.05,
      x: pos.x,
      y: pos.y,
    };

    rotationAngles.current[index] = Math.random() * 360;
    opacities.current[index] = 0;
    scaleFactors.current[index] = 1;
    scaleDirections.current[index] = Math.random() > 0.5 ? 1 : -1;

    timers.current[index] = {
      timeLeft: 6000 + Math.random() * 4000,
      fadingOut: false,
      fadingIn: true,
    };

    // Fade in
    el.style.opacity = '0.7';
  };

  useEffect(() => {
    const activeCount = MAX_FLOATING;
    for (let i = 0; i < activeCount; i++) {
      spawnNewImage(i, objects.current[i]);
    }

    const animate = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      objects.current.forEach((el, index) => {
        if (!el) return;

        const obj = velocities.current[index];
        const timer = timers.current[index];

        // Movimiento
        obj.x += obj.dx;
        obj.y += obj.dy;
        rotationAngles.current[index] += obj.rotSpeed;

        if (obj.x <= 0 || obj.x >= width - el.offsetWidth) obj.dx *= -1;
        if (obj.y <= 0 || obj.y >= height - el.offsetHeight) obj.dy *= -1;

        // Escala suave entre 0.85 y 1
        const scale = scaleFactors.current[index];
        const direction = scaleDirections.current[index];
        scaleFactors.current[index] += 0.0001 * direction;
        if (scaleFactors.current[index] > 1) {
          scaleFactors.current[index] = 1;
          scaleDirections.current[index] = -1;
        } else if (scaleFactors.current[index] < 0.85) {
          scaleFactors.current[index] = 0.85;
          scaleDirections.current[index] = 1;
        }

        // Opacidad y reaparición
        if (!timer.fadingOut && !timer.fadingIn) {
          timer.timeLeft -= 16;
          if (timer.timeLeft <= 2000) {
            timer.fadingOut = true;
            el.style.opacity = '0';
          }
        } else if (timer.fadingOut && parseFloat(el.style.opacity) <= 0.05) {
          timer.fadingOut = false;
          spawnNewImage(index, el);
        }

        el.style.transform = `translate(${obj.x}px, ${obj.y}px) rotate(${rotationAngles.current[index]}deg) scale(${scaleFactors.current[index]})`;
      });

      requestAnimationFrame(animate);
    };

    animate();
  }, []);

  return (
    <div ref={containerRef} className="pointer-events-none fixed inset-0 z-0">
      {[...Array(MAX_FLOATING)].map((_, idx) => (
        <img
          key={idx}
          ref={(el) => (objects.current[idx] = el)}
          src=""
          alt={`floating-${idx}`}
          style={{
            position: 'absolute',
            width: '70px',
            height: 'auto',
            opacity: 0,
            transform: 'translate(0px, 0px) rotate(0deg) scale(1)',
            transition: 'opacity 1.5s ease',
            willChange: 'transform, opacity',
            zIndex: 1,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingObjects;
