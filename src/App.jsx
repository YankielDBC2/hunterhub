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
import HcashAboutSectionMobile from "./components/Mobile/HcashAboutSectionMobile"
import TokenomicsShipMobile from './components/Mobile/Tokenomics/TokenomicsShipMobile';

// Componente Tablets
import GameShowcaseTablet from './components/Tablet/GameShowcaseTablet'
import HeaderTablet from './components/Tablet/HeaderTablet' 

// 💻 Componentes de escritorio
import Header from './components/Header'
import GameShowcaseSection from './components/GameShowcaseSection'
import WhatWeAreBuilding from './components/WhatWeAreBuilding'
import WhyJoin from './components/WhyJoin'
import HubCarouselSection from './components/HubCarouselSection'
import SelfEconomy from './components/SelfEconomy'
import TrendingAssetsSection from './components/TrendingAssetsSection'
import FloatingObjects from './components/FloatingObjects'
import HcashAboutSection from "./components/HcashAboutSection"
import TokenomicsShip from './components/Tokenomics/TokenomicsShip'

// 🔧 Secciones comunes
import FlyingShip from './components/FlyingShip'
import StarBackground from './components/StarBackground'

const App = () => {
  return (
    <div className="min-h-screen text-white font-sans bg-gradient-to-b from-[#111B28] via-[#0D1620] to-[#080D15] relative overflow-hidden">

      {/* Efectos visuales de fondo */}
      <StarBackground />

      {/* Floating Objects */}
      <div className="hidden lg:block">
        <FloatingObjects />
      </div>
      <div className="lg:hidden">
        <FloatingObjectsMobile />
      </div>

      {/* Flying Ship */}
      <FlyingShip />

      {/* Header */}
      <div className="block md:hidden">
        <MobileHeader />
      </div>
      <div className="hidden md:block lg:hidden">
        <HeaderTablet />
      </div>
      <div className="hidden lg:block">
        <Header />
      </div>


      {/* Game Showcase */}
      <div className="hidden lg:block">
        <GameShowcaseSection />
      </div>
      <div className="hidden md:block lg:hidden">
        <GameShowcaseTablet />
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

      {/* Hcash About Section */}
      <div className="hidden lg:block">
        <HcashAboutSection />
      </div>
      <div className="lg:hidden">
        <HcashAboutSectionMobile />
      </div>

      {/* Tokenomics */}
      <div className="hidden lg:block">
        <TokenomicsShip />
      </div>
      <div className="lg:hidden">
        <TokenomicsShipMobile />
      </div>
    </div>
  )
}

export default App
