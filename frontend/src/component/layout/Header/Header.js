import React from 'react'
import {ReactNavbar} from "overlay-navbar";

import logo from "../../../image/nobg2.png";


const options = {
burgerColorHover:"#a62d24" ,
logo,
logoWidth:"20vmax",
navColor1:"beige",
logoHoverSize:"5px",
logoHoverColor:"blue",

link1Text:"Home",
link2Text:"Product",
link3Text:"Contact",
link4Text:"About",

link1Url :"/",
link2Url :"/product",
link3Url :"/contact",
link4Url :"/about",

link1Size : "1.5vmax",
link1Color:"rgba(35,35,35,0.8)",
nav1justifyContent : "flex-end",
nav2justifyContent : "flex-end",
nav3justifyContent : "flex-start",
nav4justifyContent : "flex-start",

link1ColorHover : "#eb4034",
link2Margin:"3vmax",
link3Margin:"",
link4Margin:"3vmax",

profileIconColor:"rgba(35,35,35,0.8)",
searchIconColor:"rgba(35,35,35,0.8)",
cartIconColor:"rgba(35,35,35,0.8)",
profileIconColorHover:"#eb4034",
searchIconColorHover:"#eb4034",
cartIconColorHover : "#eb4034",
}

const Header = () => {
  return (<ReactNavbar {...options}/>
  );
};

export default Header