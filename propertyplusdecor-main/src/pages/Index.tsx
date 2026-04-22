
import { useState } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import BusinessObjectives from '@/components/BusinessObjectives';
import BusinessOfferings from '@/components/BusinessOfferings';
import LocationSearch from '@/components/LocationSearch';
import TilesSection from '@/components/TilesSection';
import InteriorDesignSection from '@/components/InteriorDesignSection';
import JoinPlatformSection from '@/components/JoinPlatformSection';
import ExpertsSection from '@/components/ExpertsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';

const Index = () => {
  const [registrationPlan, setRegistrationPlan] = useState<'shop' | 'interior' | null>(null);

  const handleSearchChange = (query: string, location: string, area: string, radius: number) => {
    console.log('Search:', { query, location, area, radius });
    // Implementation for search functionality with area filtering
  };

  const handleLocationDetect = (lat: number, lng: number) => {
    console.log('Location detected:', { lat, lng });
    // Implementation for location detection
  };

  const handleRegisterShop = () => {
    setRegistrationPlan('shop');
    // Scroll to registration section
    setTimeout(() => {
      const element = document.getElementById('join-platform');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleRegisterInterior = () => {
    setRegistrationPlan('interior');
    // Scroll to registration section
    setTimeout(() => {
      const element = document.getElementById('join-platform');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main id="home">
        <HeroSection />
        <BusinessObjectives />
        <BusinessOfferings />
        <div className="container mx-auto px-4 py-8">
          <LocationSearch 
            onSearchChange={handleSearchChange}
            onLocationDetect={handleLocationDetect}
          />
        </div>
        <TilesSection onRegisterShop={handleRegisterShop} />
        <InteriorDesignSection onRegisterInterior={handleRegisterInterior} />
        <JoinPlatformSection initialPlan={registrationPlan} />
        <ExpertsSection />
        <ContactSection />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Index;
