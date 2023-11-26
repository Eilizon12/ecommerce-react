import React from "react";
import {ReactNavbar} from "overlay-navbar";
import logo from "../../../images/nobg.png";


const options = {
  burgerColorHover:"#eb4034" ,
    logo,
    logoWidth:"60vmax",
    logoHoverSize:"5px",
    logoHoverColor:"red",
    navColor1:"beige",
    

    link1Text:"Home",
    link2Text:"Product",
    link3Text:"Contact",
    link4Text:"About",

    link1Url :"/",
    link2Url :"/product",
    link3Url :"/contact",
    link4Url :"/about",

    link1Size : "2vmax",
    link1Color: "black",
    nav1justifyContent : "flex-end",
    nav2justifyContent : "flex-end",
    nav3justifyContent : "flex-start",
    nav4justifyContent : "flex-start",

    link1ColorHover : "red",
    link1Margin:"2vmax",
    link2Margin:"2vmax",
    link3Margin:"1vmin",
    link4Margin:"3vmax",

    profileIconColor:"black",
    searchIconColor:"black",
    cartIconColor:"black",
    profileIconColorHover:"#eb4034",
    searchIconColorHover:"#eb4034",
    cartIconColorHover : "#eb4034",
   
};


const Header = () => {
  return(
<ReactNavbar {...options} />
   )
};

export default Header;