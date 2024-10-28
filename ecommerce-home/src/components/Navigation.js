import React from 'react';
import '../styles/Navigation.css'; // Підключаємо стилі

const Navigation = () => {
  return (
    <nav className="navigation">
      <ul>
        <li><a href="/home" className="active">Home</a></li>
        <li><a href="/catalog">Catalog</a></li>
        <li><a href="/cart">Cart</a></li>
      </ul>
    </nav>
  );
};

export default Navigation;
