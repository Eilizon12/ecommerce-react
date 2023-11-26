import React, { useEffect } from 'react';
import Headers from './component/layout/Header/Header.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WebFont from 'webfontloader';
import Footer from './component/layout/Footer/Footer.js';
import Home from './component/Home/Home.js';

function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Roboto', 'Droid Sans', 'Chilanka'],
      },
    });
  }, []);

  return (
    <Router>
      <Headers />
      <Routes>
        <Route exact path="/" element={<Home />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
