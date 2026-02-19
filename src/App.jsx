import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import ParticleFog from './components/ParticleFog';
import Hero from './components/Hero';
import ReviewsSection from './components/ReviewsSection';
import Services from './components/Services';
import Footer from './components/Footer';

import ThreeDComparison from './components/ThreeDComparison';

function App() {
  const [showNavbar, setShowNavbar] = useState(false);

  return (
    <div className="bg-mirari-black min-h-screen text-white selection:bg-mirari-silver selection:text-mirari-black overflow-x-hidden relative">
      <ParticleFog visible={showNavbar} />
      <AnimatePresence>
        {showNavbar && <Navbar />}
      </AnimatePresence>
      <div className="relative z-10">
        <Hero onTransitionStart={() => setShowNavbar(true)} />
        {showNavbar && (
          <>
            <ThreeDComparison />
            <ReviewsSection />
            <Services />
            <Footer />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
