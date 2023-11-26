import React from "react";
import {ReactNavbar} from "overlay-navbar";
import logo from "../../images/nobg.png";
const Header = () => {
  return(
<ReactNavbar 
    burgerColorHover="#a62d24" 
    logo = {logo}
    logoWidth="20vmax"
    logoHoverSize="5px"
    logoHoverColor="blue"

    link1Text="Home"
    link2Text="Product"
    link3Text="Contact"
    link4Text="About"

    link1Url ="/"
    link2Url ="/product"
    link3Url ="/contact"
    link4Url ="/about"

    link1Size = "1.5vmax"
    link1Color="rgba(3535350.8)"
    nav1justifyContent = "flex-end"
    nav2justifyContent = "flex-end"
    nav3justifyContent = "flex-start"
    nav4justifyContent = "flex-start"

    link1ColorHover = "#eb4034"
    link2Margin="3vmax"
    link3Margin=""
    link4Margin="3vmax"

    profileIconColor="rgba(3535350.8)"
    searchIconColor="rgba(3535350.8)"
    cartIconColor="rgba(3535350.8)"
    profileIconColorHover="#eb4034"
    searchIconColorHover="#eb4034"
    cartIconColorHover = "#eb4034"
   
   
   />
   )
};

export default Header;