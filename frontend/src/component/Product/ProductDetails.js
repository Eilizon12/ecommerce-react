import React, { Fragment, useEffect } from "react";
import Carousel from "react-material-ui-carousel";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { getProductDetails } from "../../actions/productActions";
import { useParams } from "react-router-dom"; // Import useParams hook to get route params
import ReactStars from "react-rating-stars-component";
import ReviewCard from "./ReviewCard.js";

const ProductDetails = ({ match }) => {

  const dispatch = useDispatch();
  const { id } = useParams(); // Get the 'id' parameter from the URL

  const { products, loading, error } = useSelector((state) => state.productDetails);

  useEffect(() => {
    dispatch(getProductDetails(id)); // Pass 'id' to getProductDetails action
  }, [dispatch, id]);


  const options = {
    edit:false,
    color: "gray",
    activeColor: "orange",
    size: window.innerWidth < 600 ? 20 : 25,
    value: products ? products.ratings : null,
    isHalf:true,
  };

  return (
    <Fragment>
      
      <div className="productDetails">
      
        <div>
          <Carousel>
            {products && products.image.map((item, i)=> 
            (
              <img className="carouselImage" key = {item.url} src = {item.url} alt = {`${i} Slide`} />
            ))}
            <div>
           
            </div>
           </Carousel>
        </div>
        <div>
          <div className="detailsBlock-1">
          <h2>Product Name: {products && products.name}</h2>
          <p>Product #: {products && products._id}</p>
          </div>
          <div className="detailsBlock-2">
          <h3><ReactStars /></h3>
          <h4>({products && products.numOfReviews} Reviews)</h4>
          </div>
          <div className="detailsBlock-3">
          <h1> ₱ {products && products.price}</h1>
          <div className="detailsBlock-3-1">
              <div className="detailsBlock-3-1-1">
                <button> - </button>
                <input value = "1" type="number" />
                <button> + </button>
              </div> {" "}
                <button>Add to Cart</button>
          </div>
          <p>
            Status: {" "}
            <b className= {products && products.Stock < 1 ? "redColor" : "greenColor" }>
              {products && products.Stock < 1 ? "Out of Stock" : "In Stock"}
            </b>
          </p>
          </div>
          <div className="detailsBlock-4">

           <h3> Description: {products && products.description} </h3>

          </div>
          <button className="SubmitReviews">Submit Review</button>
        </div>
      </div>
      <>
      <h1 className="rHeading"> REVIEWS </h1>
              {products && products.reviews && products.reviews[0] ? (

                <div className="reviews">
                  {products && products.reviews.map((review) => < ReviewCard review = {review} /> )}
                </div>
              
              ) : (
                <p className="noReviews">No Reviews Yet</p>
              ) }
</>
    </Fragment>          
  );
};

export default ProductDetails;
