import React from 'react';
import Header from './components/Header';
import WhyJoin from './components/WhyJoin';
import HubCarouselSection from './components/HubCarouselSection';
import GameShowcaseSection from './components/GameShowcaseSection';
import WhatWeAreBuilding from './components/WhatWeAreBuilding';
import SelfEconomy from './components/SelfEconomy';
import TrendingAssetsSection from './components/TrendingAssetsSection';
import FloatingObjects from './components/FloatingObjects';
import FlyingShip from './components/FlyingShip'; // ✅ nuevo
import StarBackground from './components/StarBackground';

const App = () => {
  return (
    <div className="min-h-screen text-white font-sans bg-gradient-to-b from-[#111B28] via-[#0D1620] to-[#080D15] relative overflow-hidden">
      <StarBackground />
      <FloatingObjects />
      <FlyingShip /> {/* ✅ nave gigante flotando diagonal */}

      <Header />
      <GameShowcaseSection />
      <WhatWeAreBuilding />
      <WhyJoin />
      <HubCarouselSection />
      <SelfEconomy />
      <TrendingAssetsSection />
    </div>
  );
};

export default App;
