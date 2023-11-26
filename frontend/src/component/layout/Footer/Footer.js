import React from 'react'
import both from "../../../images/appandplay.png";

import "./Footer.css";


const Footer = () => {
  return (
    <footer id = "footer">
        <div className="leftFooter">
            <h4> DOWNLOAD MY APP </h4>
            <p>Download App For Android and IOS Mobile Phone</p>
            <img src ={both} alt="appandplay" />
            

        </div>

        <div className="midFooter">
            <h1>ECOMMERCE BIKE SHOP</h1>
            <p>Good Quality and Trusted</p>
            <p>Copyright 2023 &copy; Eilizon Agcaoili</p>
            

        </div>
        <div className="rightFooter">
            <h2> Follow Us on: </h2>
           <a href="http://instagram.com/zoneyli">Instagram</a>
            
            

        </div>
    </footer>
  )
}

export default Footer