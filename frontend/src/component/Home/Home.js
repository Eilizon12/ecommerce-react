import React, { Fragment, useEffect, useState } from "react";
import {CgMouse} from "react-icons/cg";
import "./Home.css";
import Product from "./ProductCard.js";
import MetaData from "../layout/MetaData.js";
import { getProduct , clearErrors} from "../../actions/productActions";
import { useSelector, useDispatch   } from "react-redux";
import Loader from "../layout/Loader/Loader.js";
import {useAlert} from "react-alert";
import "./Login.css";
import '../../App.css'
import { Link } from "react-router-dom";







const Home = () => {

    const alert = useAlert();

    const dispatch = useDispatch();
    const {loading, error, products, productsCount } = useSelector ( (state) => state.products);

    const [category,setCategory] =useState('')
    const categories = [
        category
    ]

    useEffect(()=>{

        if(error){
            return alert.error(error)
            dispatch(clearErrors());
            
        }

        dispatch(getProduct());
        
    }, [dispatch,error, alert]);




  return (
    
  <Fragment>

    {loading ? (<Loader />):( <Fragment>

<MetaData title = "BIKE SHOP Ecommerce" />




<div className="banner">
    
<Link to="/login" className="login">Login</Link>
    <p>Welcome To Eili's Bike Shop </p>
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
)}

  </Fragment>
  );
};

export default Home