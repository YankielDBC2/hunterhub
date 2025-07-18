import React from 'react';

// 📱 Componentes móviles
import MobileHeader from './components/Mobile/MobileHeader';
import GameShowcaseMobile from './components/Mobile/GameShowcaseMobile';
import WhatWeAreBuildingMobile from './components/Mobile/WhatWeAreBuildingMobile';
import WhyJoinMobile from './components/Mobile/WhyJoinMobile'; // ✅ nuevo import

// 💻 Componentes de escritorio
import Header from './components/Header';
import GameShowcaseSection from './components/GameShowcaseSection';
import WhatWeAreBuilding from './components/WhatWeAreBuilding';
import WhyJoin from './components/WhyJoin';

// 🔧 Secciones comunes
import HubCarouselSection from './components/HubCarouselSection';
import SelfEconomy from './components/SelfEconomy';
import TrendingAssetsSection from './components/TrendingAssetsSection';
import FloatingObjects from './components/FloatingObjects';
import FlyingShip from './components/FlyingShip';
import StarBackground from './components/StarBackground';
import HcashAboutSection from './components/HcashAboutSection';
import TokenomicsShip from './components/Tokenomics/TokenomicsShip';

const App = () => {
  return (
    <div className="min-h-screen text-white font-sans bg-gradient-to-b from-[#111B28] via-[#0D1620] to-[#080D15] relative overflow-hidden">
      {/* Efectos visuales de fondo */}
      <StarBackground />
      <FloatingObjects />
      <FlyingShip />

      {/* Header según dispositivo */}
      <div className="hidden lg:block">
        <Header />
      </div>
      <div className="lg:hidden">
        <MobileHeader />
      </div>

      {/* Showcase según dispositivo */}
      <div className="hidden lg:block">
        <GameShowcaseSection />
      </div>
      <div className="lg:hidden">
        <GameShowcaseMobile />
      </div>

      {/* WhatWeAreBuilding según dispositivo */}
      <div className="hidden lg:block">
        <WhatWeAreBuilding />
      </div>
      <div className="lg:hidden">
        <WhatWeAreBuildingMobile />
      </div>

      {/* WhyJoin según dispositivo */}
      <div className="hidden lg:block">
        <WhyJoin />
      </div>
      <div className="lg:hidden">
        <WhyJoinMobile />
      </div>

      {/* Secciones comunes */}
      <HubCarouselSection />
      <SelfEconomy />
      <TrendingAssetsSection />
      <HcashAboutSection />
      <TokenomicsShip />
    </div>
  );
};

export default App;
