import React from 'react'
import playStore from "../../../image/playstore.png";
import appStore from "../../../image/appstore.png";
import "./Footer.css"

const Footer = () => {
  return (

    <footer id = "footer">
        <div className="leftFooter">
            <h4>Download Now</h4>
            <p>Download App for IOS and Android</p>
            <img src = {playStore} alt="playstore" />
            <img src = {appStore} alt="playstore" />

        </div>
        <div className="midFooter">
            <h1>ECOMMERCE REACT</h1>
            <p>Quality Product</p>
            <p>Copy Rights 2001 &copy; Eilizon Agcaoili</p>
        </div>
        <div className="rightFooter">
            <h3>Follow Us</h3>
            <a href="http://instagram.com/zoneyli">Instagram</a>

        </div>

    </footer>
    
  );
};

export default Footer;