import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navigation.css'; // Підключаємо стилі

const Navigation = ({ activePage }) => {
  return (
    <nav className="navigation">
      <ul>
        <li>
          <Link to="/" className={activePage === 'home' ? 'active' : ''}>Home</Link>
        </li>
        <li>
          <Link to="/catalog" className={activePage === 'catalog' ? 'active' : ''}>Catalog</Link>
        </li>
        <li>
          <Link to="/cart" className={activePage === 'cart' ? 'active' : ''}>Cart</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
