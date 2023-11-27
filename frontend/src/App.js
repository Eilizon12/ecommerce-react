import React, { useEffect } from 'react';
import Header from './component/layout/Header/Header.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WebFont from 'webfontloader';
import Footer from './component/layout/Footer/Footer.js';
import Home from './component/Home/Home.js';
// import Loader from './component/layout/Loader/Loader.js';
import ProductDetails from "./component/Product/ProductDetails.js";

function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Roboto', 'Droid Sans', 'Chilanka'],
      },
    });
  }, []); // Empty dependency array ensures the effect runs only once (on mount)

  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/product/:id" element={<ProductDetails />} />

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;