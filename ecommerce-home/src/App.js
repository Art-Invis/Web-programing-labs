import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/HeaderComponent';
import MainContent from './components/MainContentComponent';
import Categories from './components/CategoriesComponent';
import Footer from './components/FooterComponent';
import CatalogPage from './components/CatalogPage';
import ItemPage from './components/ItemPage';

function App() {
  const location = useLocation();

  const getActivePage = () => {
    if (location.pathname.includes("/catalog") || location.pathname.includes("/item")) {
      return "catalog";
    }
    if (location.pathname === "/cart") return "cart";
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
      <Header activePage={getActivePage()} searchTerm={searchTerm} onSearchChange={handleSearchChange} />
      <Routes>
        <Route path="/" element={
          <>
            <MainContent />
            <Categories />
          </>
        } />
        <Route path="/catalog/*" element={<CatalogPage searchTerm={searchTerm} setSearchTerm={setSearchTerm} resetSearchTerm={resetSearchTerm} />} />
        <Route path="/item/:id" element={<ItemPage />} />
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
