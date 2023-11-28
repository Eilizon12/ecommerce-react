import React, { useEffect } from 'react';
import Header from './component/layout/Header/Header.js';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WebFont from 'webfontloader';
import Footer from './component/layout/Footer/Footer.js';
import Home from './component/Home/Home.js';
// import Loader from './component/layout/Loader/Loader.js';
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js";
import Search from "./component/Product/Search.js";
import Login from './component/User/Login.js';
// import LoginSignup from './component/User/LoginSignup.js';

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
        <Route exact path="/products" element={<Products />} />
        <Route exact path="/search" element={<Search />} />


        <Route exact path="/login" element = {<Login /> } />
s

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;