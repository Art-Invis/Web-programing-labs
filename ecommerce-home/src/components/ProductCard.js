import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/ProductCard.css";

const getProductImage = (type) => {
  switch (type) {
    case 'tickets':
      return '/tickets.jpg';
    case 'merch':
      return '/merch.jpg';
    case 'albums':
      return '/album.jpg';
    case 'instruments':
      return '/instruments.jpg';
    case 'vinyl':
      return '/vinyl.jpg';
    default:
      return '/discover.jpg'; 
  }
};

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    const productImage = getProductImage(product.type);
    navigate(`/item/${product.id}`, { state: { product, productImage } });
  };

  return (
    <div className="product-card">
      <div className="product-type-badge">{product.type}</div>
      
      <img src={getProductImage(product.type)} alt={product.title} className="product-image" />
      
      <h3>{product.title}</h3>
      <p className="product-description">★ {product.description}</p>
      
      <p className="product-release"><strong>Release Date:</strong>  {new Date(product.releaseDate).toLocaleDateString()}</p>
      
      <p className="product-price"><strong>${product.price}</strong></p>
      
      <button className='card-button' onClick={handleButtonClick}>View more</button>
    </div>
  );
};

export default ProductCard;
