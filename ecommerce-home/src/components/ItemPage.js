import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "../styles/ItemPage.css";

const getSelectableOptions = (type) => {
  switch (type) {
    case 'tickets':
      return [
        { label: 'Standard', value: 'standard' },
        { label: 'VIP', value: 'vip' },
        { label: 'Student', value: 'student' },
      ];
    case 'merch':
      return [
        { label: 'Small (S)', value: 'small' },
        { label: 'Medium (M)', value: 'medium' },
        { label: 'Large (L)', value: 'large' },
        { label: 'Extra Large (XL)', value: 'xl' },
      ];
    case 'albums':
      return [
        { label: 'CD', value: 'cd' },
        { label: 'Vinyl', value: 'vinyl' },
        { label: 'Digital', value: 'digital' },
      ];
    case 'instruments':
      return [
        { label: 'Acoustic', value: 'acoustic' },
        { label: 'Electric', value: 'electric' },
      ];
    case 'vinyl':
      return [
        { label: 'Standard Edition', value: 'standard' },
        { label: 'Collector\'s Edition', value: 'collectors' },
      ];
    default:
      return [];
  }
};

const ItemPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state?.product;
  const productImage = location.state?.productImage; 

  const [quantity, setQuantity] = useState(1);
  const [selectedOption, setSelectedOption] = useState("");

  if (!product) {
    return <p>Product not found</p>;
  }

 
  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };


  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };


  const selectableOptions = getSelectableOptions(product.type);

  return (
    <div className="item-page">
      <div className="product-image-container">
        {/* Використовуємо зображення, передане з ProductCard */}
        <img src={productImage} alt={product.title} />
      </div>
      <div className="product-info">
        <h1>{product.title}</h1>
        <p>{product.description}</p>
        <p>Release Date: {new Date(product.releaseDate).toLocaleDateString()}</p>

        {/* Поля для кількості та вибору специфікації */}
        <div className="fields">
          {/* Кількість товару */}
          <div className="field">
            <label>Countable field</label>
            <input 
              type="number" 
              value={quantity} 
              onChange={handleQuantityChange} 
              min="1" 
              placeholder="1" 
            />
          </div>

          {/* Вибір специфікації в залежності від типу товару */}
          {selectableOptions.length > 0 && (
            <div className="field">
              <label>Selectable Field</label>
              <select value={selectedOption} onChange={handleOptionChange}>
                <option value="">Select</option>
                {selectableOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
        <p className="product-price">Price: ${product.price}</p>

        <div className="buttons">
          <button className="buy-button">Add to Cart</button>
          <button className="back-button" onClick={() => navigate(-1)}>Go Back</button>
        </div>
      </div>
    </div>
  );
};

export default ItemPage;
