import React from 'react'

// 📱 Componentes móviles
import MobileHeader from './components/Mobile/MobileHeader'
import GameShowcaseMobile from './components/Mobile/GameShowcaseMobile'
import WhatWeAreBuildingMobile from './components/Mobile/WhatWeAreBuildingMobile'
import WhyJoinMobile from './components/Mobile/WhyJoinMobile'
import HubCarouselSectionMobile from './components/Mobile/HubCarouselSectionMobile'
import SelfEconomyMobile from './components/Mobile/SelfEconomyMobile'
import TrendingAssetsSectionMobile from './components/Mobile/TrendingAssetsSectionMobile'
import FloatingObjectsMobile from './components/Mobile/FloatingObjectsMobile'

// 💻 Componentes de escritorio
import Header from './components/Header'
import GameShowcaseSection from './components/GameShowcaseSection'
import WhatWeAreBuilding from './components/WhatWeAreBuilding'
import WhyJoin from './components/WhyJoin'
import HubCarouselSection from './components/HubCarouselSection'
import SelfEconomy from './components/SelfEconomy'
import TrendingAssetsSection from './components/TrendingAssetsSection'
import FloatingObjects from './components/FloatingObjects'

// 🔧 Secciones comunes
import FlyingShip from './components/FlyingShip'
import StarBackground from './components/StarBackground'
import HcashAboutSection from './components/HcashAboutSection'
import TokenomicsShip from './components/Tokenomics/TokenomicsShip'

const App = () => {
  return (
    <div className="min-h-screen text-white font-sans bg-gradient-to-b from-[#111B28] via-[#0D1620] to-[#080D15] relative overflow-hidden">
      {/* Efectos visuales de fondo */}
      <StarBackground />
      
      {/* Floating Objects según dispositivo */}
      <div className="hidden lg:block">
        <FloatingObjects />
      </div>
      <div className="lg:hidden">
        <FloatingObjectsMobile />
      </div>

      <FlyingShip />

      {/* Header */}
      <div className="hidden lg:block">
        <Header />
      </div>
      <div className="lg:hidden">
        <MobileHeader />
      </div>

      {/* Game Showcase */}
      <div className="hidden lg:block">
        <GameShowcaseSection />
      </div>
      <div className="lg:hidden">
        <GameShowcaseMobile />
      </div>

      {/* What We Are Building */}
      <div className="hidden lg:block">
        <WhatWeAreBuilding />
      </div>
      <div className="lg:hidden">
        <WhatWeAreBuildingMobile />
      </div>

      {/* Why Join */}
      <div className="hidden lg:block">
        <WhyJoin />
      </div>
      <div className="lg:hidden">
        <WhyJoinMobile />
      </div>

      {/* Hub Carousel */}
      <div className="hidden lg:block">
        <HubCarouselSection />
      </div>
      <div className="lg:hidden">
        <HubCarouselSectionMobile />
      </div>

      {/* Self Economy */}
      <div className="hidden lg:block">
        <SelfEconomy />
      </div>
      <div className="lg:hidden">
        <SelfEconomyMobile />
      </div>

      {/* Trending Assets */}
      <div className="hidden lg:block">
        <TrendingAssetsSection />
      </div>
      <div className="lg:hidden">
        <TrendingAssetsSectionMobile />
      </div>

      {/* Comunes */}
      <HcashAboutSection />
      <TokenomicsShip />
    </div>
  )
}

export default App
