import React from 'react';
import '../styles/Categories.css';
import Button from './ButtonComponent.js' ;

const Categories = () =>  {
  return (
    <section className="categories">
      <h2>______________Our Product Categories:______________</h2>
      <div className="category-cards">
        <div className="category-card">
          <img src="/album.jpg" alt="Albums" />
          <h3>Albums</h3>
          <ul>
            <li>Huge selection of albums</li>
            <li>Explore a variety of genres</li>
            <li>Exclusive limited editions</li>
            <li>Top-selling albums of the year</li>
          </ul>
        </div>
        <div className="category-card">
          <img src="/Merch.jpg" alt="Merch" />
          <h3>Merchandise</h3>
          <ul>
            <li>Official band merchandise</li>
            <li>T-shirts, posters, accessories</li>
            <li>Limited-edition collections</li>
            <li>Free shipping on orders over $50</li>
          </ul>
        </div>
        <div className="category-card">
          <img src="tickets.jpg" alt="Tickets" />
          <h3>Concert Tickets</h3>
          <ul>
            <li>Access to exclusive concerts</li>
            <li>Buy e-tickets instantly</li>
            <li>VIP packages available</li>
            <li>Get early bird discounts</li>
          </ul>
        </div>
      </div>
      <Button/>
    </section>
  );
}

export default Categories;
