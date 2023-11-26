import React, { Component } from 'react';
import Headers from "./component/layout/Header/Header.js";
import { BrowserRouter as Router } from "react-router-dom";
import WebFont from "webfontloader";
import Footer from "./component/layout/Footer/Footer.js";

class App extends Component {
  componentDidMount() {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"]
      }
    });
  }

  render() {
    return (
      <Router>
        <Headers />


        <Footer />
      </Router>
    );
  }
}

export default App;
