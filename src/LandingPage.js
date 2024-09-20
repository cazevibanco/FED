// LandingPage.js
import React from 'react';
import Header from './Header';
import Promo from './Promo';
import Order from './Order';
import Footer from './Footer';

const LandingPage = () => {
  return (
    <div>
      <Header />
      <Promo />
      <Order />
      <Footer />
    </div>
  );
};

export default LandingPage;