import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Імпорт useSelector для доступу до стану Redux
import Header from './components/HeaderComponent';
import MainContent from './components/MainContentComponent';
import Categories from './components/CategoriesComponent';
import Footer from './components/FooterComponent';
import CatalogPage from './components/CatalogPage';
import ItemPage from './components/ItemPage';
import CartPage from './components/CartPage'; // Імпортуємо сторінку кошика
import CheckoutPage from './components/CheckoutPage';
import SuccessPage from './components/SuccessPage';
function App() {
  const location = useLocation();
  const cart = useSelector((state) => state.cart); // Доступ до кошика з Redux store

  const getActivePage = () => {
    if (location.pathname.includes("/catalog") || location.pathname.includes("/item")) {
      return "catalog";
    }
    if (location.pathname === "/cart" || location.pathname === "/checkout" || location.pathname === "/success") {
      return "cart";  // Keep "Cart" active on both Cart and Checkout pages
    }
    return "home";
  };

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const resetSearchTerm = () => {
    setSearchTerm(''); // Очищення пошукового терміна
  };

  return (
    <div className="App">
      <Header 
        activePage={getActivePage()} 
        searchTerm={searchTerm} 
        onSearchChange={handleSearchChange} 
        cartItemCount={cart.length} // Відображаємо кількість товарів у кошику
      />
      <Routes>
        <Route path="/" element={
          <>
            <MainContent />
            <Categories />
          </>
        } />
        <Route path="/catalog/*" element={<CatalogPage searchTerm={searchTerm} setSearchTerm={setSearchTerm} resetSearchTerm={resetSearchTerm} />} />
        <Route path="/item/:id" element={<ItemPage />} />
        <Route path="/cart" element={<CartPage />} /> {/* Додаємо сторінку кошика */}
        <Route path="/checkout" element={<CheckoutPage />} /> {/* Додаємо маршрут */}
        <Route path="/success" element={<SuccessPage />} /> {/* Додаємо сторінку успіху */}
      </Routes>
      <Footer />
    </div>
  );
}

export default function WrappedApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}
