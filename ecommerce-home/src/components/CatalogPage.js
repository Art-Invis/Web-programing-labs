import React, { useState, useCallback } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import FiltersComponent from './FiltersComponent';
import ProductCard from './ProductCard';
import ItemPage from './ItemPage';
import '../styles/CatalogPage.css';

const initialProducts = [ 
  { id: 1, type: "tickets", title: "Coldplay Concert Ticket", description: "Coldplay live in concert with an amazing light show.", price: 50, releaseDate: "2023-06-12" },
  { id: 2, type: "merch", title: "Twenty One Pilots Band T-shirt", description: "Official Twenty One Pilots T-shirt featuring their iconic logo.", price: 25, releaseDate: "2023-05-01" },
  { id: 3, type: "albums", title: "Imagine Dragons - Evolve", description: "The hit album 'Evolve' featuring the singles 'Believer' and 'Thunder'.", price: 18, releaseDate: "2023-07-20" },
  { id: 4, type: "instruments", title: "Fender Electric Guitar", description: "High-quality Fender electric guitar for professionals and beginners.", price: 200, releaseDate: "2023-08-15" },
  { id: 5, type: "albums", title: "Marshmello - Joytime III", description: "Marshmello's third studio album, full of energetic EDM tracks.", price: 20, releaseDate: "2023-09-01" },
  { id: 6, type: "vinyl", title: "The Beatles - Abbey Road Vinyl", description: "A classic vinyl collection of The Beatles' iconic 'Abbey Road' album.", price: 100, releaseDate: "2023-10-05" },
  { id: 7, type: "tickets", title: "Imagine Dragons Concert Ticket", description: "Get your ticket to see Imagine Dragons live with a mesmerizing performance.", price: 60, releaseDate: "2023-11-15" },
  { id: 8, type: "merch", title: "Twenty One Pilots Hoodie", description: "Official Twenty One Pilots hoodie featuring their latest album design.", price: 35, releaseDate: "2023-04-12" },
  { id: 9, type: "albums", title: "Queen - A Night at the Opera", description: "Queen's classic album featuring the legendary track 'Bohemian Rhapsody'.", price: 25, releaseDate: "2023-03-25" },
  { id: 10, type: "vinyl", title: "Queen - Greatest Hits Vinyl", description: "Queen's greatest hits now available on vinyl, including 'We Will Rock You'.", price: 110, releaseDate: "2023-12-01" }
];

const CatalogPage = ({ searchTerm, setSearchTerm }) => {
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortCriteria, setSortCriteria] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const navigate = useNavigate();

  const handleFilterChange = useCallback(() => {
    let updatedProducts = [...initialProducts];

    if (selectedCategory !== '') {
      updatedProducts = updatedProducts.filter(product => product.type === selectedCategory);
    }

    if (sortCriteria === 'price') {
      updatedProducts.sort((a, b) => sortOrder === 'asc' ? a.price - b.price : b.price - a.price);
    } else if (sortCriteria === 'alphabet') {
      updatedProducts.sort((a, b) => sortOrder === 'asc'
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title));
    } else if (sortCriteria === 'releaseDate') {
      updatedProducts.sort((a, b) => sortOrder === 'asc'
        ? new Date(a.releaseDate) - new Date(b.releaseDate)
        : new Date(b.releaseDate) - new Date(a.releaseDate));
    }

    if (searchTerm) {
      updatedProducts = updatedProducts.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(updatedProducts);
  }, [selectedCategory, sortCriteria, sortOrder, searchTerm]);

  const resetFilters = () => {
    setSelectedCategory('');
    setSortCriteria('');
    setSortOrder('asc');
    setSearchTerm(''); 
    setFilteredProducts(initialProducts); 
  };

  const viewProductDetails = (product) => {
    navigate(`/item/${product.id}`, { state: { product } });
  };

  return (
    <Routes>
      <Route 
        path="/" 
        element={
          <div className="catalog-page">
            <FiltersComponent 
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              sortCriteria={sortCriteria}
              setSortCriteria={setSortCriteria}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
              onFilterChange={handleFilterChange}
              resetFilters={resetFilters} 
            />
            
            <div className="products-grid">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} onViewDetails={viewProductDetails} />
              ))}
            </div>
          </div>
        } 
      />
      {/* Використовуємо  оригінальний ItemPage */}
      <Route path="/item/:id" element={<ItemPage products={initialProducts} />} />
    </Routes>
  );
};

export default CatalogPage;