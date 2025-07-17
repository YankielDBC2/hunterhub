# 🌌 Space Hunters - Landing Page

Landing page oficial del universo **Space Hunters Ecosystem**. Este sitio combina elementos visuales de alto impacto con una arquitectura moderna basada en React, Vite y animaciones dinámicas inspiradas en videojuegos AAA y experiencias interactivas tipo Corsair Gaming.

---

## 🚀 Tecnologías Utilizadas

- **React + Vite**: SPA moderna con recarga ultra rápida.
- **TailwindCSS**: Framework de utilidades estilizado.
- **Framer Motion**: Animaciones fluidas y personalizadas.
- **React TSParticles**: Efectos de partículas avanzadas.
- **YouTube Embed**: Video interactivo con autoplay.
- **Modularización completa**: Componentes por sección.
- **Dark Theme Total**: Visuales coherentes en tonos oscuros.

---

## 🧩 Secciones Interactivas

### 🎮 Showcase de Juegos

- Muestra dinámica con selector inferior.
- Imagen vertical del juego con animación `scale`.
- Fondo que cambia automáticamente al seleccionar un juego.
- Info del juego con título, descripción, tags y botones de acción.

### 🔥 "Why Join" Section

- Título con animación **tipo máquina de escribir cíclica** entre `"Play-To-Earn"`, `"Free-To-Play"` y `"Engage-To-Earn"`.
- Cuatro beneficios con **efecto glow lento en bucle**.
- Imágenes flotantes sincronizadas con `framer-motion`.

### 🧠 "What We Are Building"

- Video con miniatura personalizada.
- Reproducción automática al clic.
- Fondo estirado sin bordes negros.
- Título con signo de interrogación animado (giro continuo).
- Explicación clara del ecosistema: Tech Generators, monedas ($HCASH, $HCREDIT), Web Hub, etc.

---

## 🎨 Efectos Visuales y Animaciones

### 💠 Fondos y Gradientes

- Gradientes radiales y verticales para suavizar uniones entre secciones.
- Eliminación de líneas negras laterales mediante corrección de anchura y `bg`.

### ⚙️ Animaciones

- Entrada suave (`opacity + y/scale`) con `viewport once`.
- Flotación continua (`y-axis float`) en imágenes clave.
- Pulso Glow (`boxShadow`) lento sobre tarjetas de beneficios.
- Máquina de escribir dinámica con `AnimatePresence`.

---

## 📂 Estructura Sugerida

src/
├── components/
│ ├── GameShowcaseSection.jsx
│ ├── WhyJoin.jsx
│ └── WhatWeAreBuilding.jsx
├── assets/
│ ├── images/
│ └── cover_video.png
├── App.jsx
└── main.jsx


---

## 📦 Instalación y Ejecución

```bash
# 1. Instalar dependencias
npm install

# 2. Ejecutar en desarrollo
npm run dev

# 3. Generar build de producción
npm run build


💡 Backlog / Mejoras Futuras
🌈 Fondo RGB con shader reactivo en tiempo real

🌫️ Niebla dinámica en canvas con noise

📱 Menú mobile tipo drawer completo

🎮 Miniaturas animadas para clases del juego

🧠 Integración de lore y NFTs en tiempo real


🛡️ Licencia
MIT © Space Hunters Studio