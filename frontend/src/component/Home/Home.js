import React, { Fragment, useEffect } from "react";
import {CgMouse} from "react-icons/cg";
import "./Home.css";
import Product from "./Product.js";
import MetaData from "../layout/MetaData.js";
import { getProduct } from "../../actions/productActions";
import { useSelector, useDispatch   } from "react-redux";





const Home = () => {
    const dispatch = useDispatch();
    const {loading, error, products, productsCount } = useSelector ( (state) => state.products);


    useEffect(()=>{

        dispatch(getProduct());
        
    }, [dispatch]);




  return (
    
  <Fragment>

    <MetaData title = "BIKE SHOP Ecommerce" />

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

{products && products.map((product) => (
    <Product product = {product} />))}     
       
      
    </div>
  </Fragment>
  );
};

export default Home