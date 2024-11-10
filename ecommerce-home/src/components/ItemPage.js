import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductById } from '../api';
import "../styles/ItemPage.css"

const ItemPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await fetchProductById(id);
        setProduct(data); 
      } catch (error) {
        console.error("Error loading product:", error);
      }
    };
    loadProduct();
  }, [id]);

  if (!product) {
    return <p>Product not found</p>;
  }

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div className="item-page">
      <div className="product-image-container">
        
        <img src={product.imageUrl} alt={product.title} className="product-image" />
      </div>
      <div className="product-info">
        <h1>{product.title}</h1>
        <p>{product.description}</p>
        <p>Release Date: {new Date(product.releaseDate).toLocaleDateString()}</p>

        <div className="fields">
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

          {product.selectableOptions?.length > 0 && (
            <div className="field">
              <label>Selectable Field</label>
              <select value={selectedOption} onChange={handleOptionChange}>
                <option value="">Select</option>
                {product.selectableOptions.map((option) => (
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
