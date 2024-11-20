import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/actions';
import { fetchProductById } from '../api';
import "../styles/ItemPage.css";

const ItemPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedOption, setSelectedOption] = useState("");
  const [error, setError] = useState(""); // Стан для повідомлення про помилку
  const [successMessage, setSuccessMessage] = useState(""); // Стан для сповіщення про успішне додавання в кошик

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
    // Перевірка, чи кількість не перевищує максимально доступну кількість для вибраної опції
    const value = Math.min(e.target.value, product.selectableOptions.find(option => option.value === selectedOption)?.quantity);
    setQuantity(value);
  };

  const handleAddToCart = () => {
    if (product.selectableOptions?.length > 0 && !selectedOption) {
      setError("Please select an option before adding to cart.");
      return;
    }

    // Перевірка, чи кількість товару не перевищує максимальну кількість для вибраної опції
    const selectedOptionDetails = product.selectableOptions.find(option => option.value === selectedOption);
    if (selectedOptionDetails && quantity > selectedOptionDetails.quantity) {
      setError(`Only ${selectedOptionDetails.quantity} items available.`);
      return;
    }

    const itemToAdd = {
      ...product,
      quantity,
      selectedOption,
      maxQuantity: selectedOptionDetails?.quantity, // Передаємо максимальну кількість для вибраної опції
    };
    dispatch(addToCart(itemToAdd));

    // Показуємо повідомлення про успішне додавання
    setSuccessMessage(`"${product.title}" added to cart!`);
    
    // Скидаємо повідомлення після 3 секунд
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const selectedOptionDetails = product.selectableOptions?.find(option => option.value === selectedOption);

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
              max={selectedOptionDetails?.quantity}  // Максимальна кількість для вибраної опції
              placeholder="1" 
            />
          </div>

          {product.selectableOptions?.length > 0 && (
            <div className="field">
              <label>Selectable Field</label>
              <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
                <option value="">Select</option>
                {product.selectableOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label} - {option.quantity} available
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Відображення помилки, якщо опція не вибрана */}
        {error && <p className="error-message">{error}</p>}

        {/* Відображення кількості товару для вибраної опції */}
        {selectedOptionDetails && (
          <p className="availability-message">
            Available for selected option: {selectedOptionDetails.quantity} items
          </p>
        )}

        <p className="product-price">Price: ${product.price}</p>

        <div className="buttons">
          <button className="buy-button" onClick={handleAddToCart}>Add to Cart</button>
          <button className="back-button" onClick={() => navigate(-1)}>Go Back</button>
        </div>
        
        {/* Сповіщення про успішне додавання в кошик */}
        {successMessage && <div className="success-message">{successMessage}</div>}
      </div>
    </div>
  );
};

export default ItemPage;
