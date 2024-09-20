import React from 'react';
import headerImage from './header-img.png';
import './App.css';

const Header = () => {
  return (
    <>
      <header className="header">
        <img src={headerImage} alt="Header" className="header-image" />
      </header>
    </>
  );
};

export default Header;