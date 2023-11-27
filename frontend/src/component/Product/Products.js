import React, { Fragment, useEffect, useState } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors,getProduct } from "../../actions/productActions";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import Pagination from "react-js-pagination"
import Slide from "@material-ui/core/Slider"




const Products = (match) => {
    const dispatch = useDispatch();

const [currentPage, setCurrentPage] = useState(1);





    const {products, loading,error,productsCount, resultPerPage} = useSelector (state=> state.products);


const setCurrentPageNo = (e) => { 
  setCurrentPage(e)
}


useEffect(() => {

  dispatch(getProduct())

}, [dispatch,])



  return (
    <Fragment>
        {loading ? <Loader /> : (
            <Fragment>
                
                
                <h2 className="productsHeading">Products <a href = "/search"  className="searchButton">Search</a></h2>
                <div className="products">
                    {products && products.map((product) =>
                        <ProductCard key={product._id} product={product} />
                    )}
                </div>

                      <div className="paginationBox">
                        <Pagination activePage={currentPage} itemsCountPerPage={resultPerPage} totalItemsCount={productsCount} onChange={setCurrentPageNo} nextPageText="Next" prevPageText= "Prev" firstPageText= "1st" lastPageText="Last" itemClass="page-item" linkClass="page-link" activeClass="pageItemActive"/>
                      </div>


            </Fragment>
        )}
    </Fragment>
  )
}

export default Products