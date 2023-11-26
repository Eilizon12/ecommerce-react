import React, { Fragment, useEffect } from "react";
import {CgMouse} from "react-icons/cg";
import "./Home.css"
import Product from "./Product.js";
import Metadata from "../layout/Metadata";





const product = {
    name: "Kask Rapido Helmet",
    image: [{url: "https://cdn.shopify.com/s/files/1/0610/1031/3435/products/Rapidoanthracitethumb.jpg?v=1667281790&width=533"}],
    price: "$300",
    _id:"user1",
};

const Home = () => {

 

  return (
  <Fragment>

<Metadata title ="Ecommerce Bike " />


<div className="banner">
    {/* <MetaData title = "ECOMMERCE REACT" /> */}
    <p>Welcome To Bike Shop</p>
    <h1>Find Amazing Parts of Bike</h1>

    <a href="#container">
        <button>
            Scroll <CgMouse />
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