import React from 'react';
import './index.css'; // Import the CSS file for the promo

const Promo = () => {
  return (
    <div className="promo">
      <marquee behavior="scroll" direction="left" scrollamount="5">
        <p>5% DISCOUNT ON ALL ESPRESSO BAR DRINKS!!! BUY NOW!</p>
      </marquee>
    </div>
  );
};

export default Promo;