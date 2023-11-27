import React from "react";
import ReactStars from "react-rating-stars-component";
import profilePng from "../../images/nobguser.png";
import "./ProductDetails.css";


const ReviewCard = ({review}) => {

    const options = {
        edit:false,
        color:"gray",
        activeColor:"red",
        size: window.innerWidth < 600 ? 20 : 25,
        value: review.rating,
        isHalf:true,
    };
    
  return (
    <div class="reviewCard">
        <img src = {profilePng} alt = "User" />
        <h2> Name: {review.name}</h2>
        <h3>The React: <ReactStars {...options} /></h3>
        <h4>Reviews: {review.comment}</h4>
    </div>
  );
};

export default ReviewCard;