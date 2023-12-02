import React, { Fragment, useEffect } from "react";
// import Pagination from 'react-js' 

import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from "../../actions/productActions";

import Loader from '../layout/Loader';

const Home = () => {

  const dispatch = useDispatch();
  
  const {loading, products,error} = useSelector(state => state.products)

useEffect(() =>{

dispatch(getProducts());

}, [dispatch])
  
  useEffect(() =>{


  }, [])

  return (
<Fragment>
     {
      loading ? <Loader /> : (
        <Fragment>
        <h1 id="products_heading"> Latest Product </h1>
       
        
          <section id="products" className="container mt-5">
            <div className="row">
              {products && products.map(product => (
    
                  <div key = {product._id} className="col-sm-12 col-md-6 col-lg-3 my-3">
                  <div className="card p-3 rounded">
                    <img
                      className="card-img-top mx-auto"
                      src={product.image[0].url}
                    />
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">
                        <a href="">{product.name}</a>
                      </h5>
                      <div className="ratings mt-auto">
                        <div className="rating-outer">
                          <div className="rating-inner"></div>
                        </div>
                        <span id="no_of_reviews">({} Reviews)</span>
                      </div>
                      <p className="card-text">$45.67</p>
                      <a href="#" id="view_btn" className="btn btn-block">
                        View Details
                      </a>
                    </div>
                  </div>
                </div> 
              ))}
                  
                
             
            
               
    
            </div>
          </section>
          </Fragment>
      )
     }
        
     
     
    </Fragment>
  );
};

export default Home;
