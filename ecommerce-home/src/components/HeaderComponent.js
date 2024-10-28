import React from 'react';
import Navigation from './Navigation';
import '../styles/Header.css'; // Оновлюємо шлях до стилів


const Header = () => {
  return (
    <header>
      {/* <h3 className='page-title'>Home Page</h3> */}
      <div className="logo">
      {/* <img src="/music.png" alt="logo"/>  */}
        <h1><i className="fas fa-headphones-alt"></i> Music World</h1>
      </div>
      <Navigation />
    </header>
  );
};

export default Header;
