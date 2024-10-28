import React from 'react';
import Header from './components/HeaderComponent';
import MainContent from './components/MainContentComponent';
import Categories from './components/CategoriesComponent';
import Footer from './components/FooterComponent';

function App() {
  return (
    <div className="App">
      <Header />
      <MainContent />
      <Categories />
      <Footer />
    </div>
  );
}

export default App;
