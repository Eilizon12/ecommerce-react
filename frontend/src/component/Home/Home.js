import React, { Fragment } from "react";
import {CgMouse} from "react-icons/cg";
import "./Home.css";
import Product from "./Product.js";


const product = {
    name: "Helmet Rapido Kask",
    images: [{url: "https://images-na.ssl-images-amazon.com/images/I/41hltv9c9pL.jpg"}],
    price: "$450",
    _id: "user1", 
};

const Home = () => {
  return (
  <Fragment>

    <div className="banner">
        <p>Welcome To Eili's Bike Shop</p>
        <h1>FIND GOOD QUALITY AND TRUSTED PRODUCT BELOW</h1>

        <a href="#container">
            <button>
                SCROLL <CgMouse />
            </button>
        </a>
    </div>
    <h2 className="homeHeading">Featured Product</h2>

    <div className="container" id = "container">

        <Product product = {product} />
        <Product product = {product} />
        <Product product = {product} />
        <Product product = {product} />

        <Product product = {product} />
        <Product product = {product} />
        <Product product = {product} />
        <Product product = {product} />

    </div>
  </Fragment>
  );
};

export default Home