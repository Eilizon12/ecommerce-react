import React, { Fragment, useEffect, useState } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productActions";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import Pagination from "react-js-pagination";
import { Link } from "react-router-dom";
import Metadata from "../layout/MetaData";
import './Dropdown.css';



const Products = () => {

  
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { products, loading, error, productsCount, resultPerPage } = useSelector((state) => state.products);
  const [currentPage, setCurrentPage] = useState(1);
  

  const setCurrentPageNo = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch]);

  return (
    <Fragment>
      <Metadata title="Products" />
      {loading ? (
        <Loader />
    
      ) : (
        <Fragment>
          {error && <div className="error-message">{error}</div>}
          <h2 className="productsHeading">Products <Link to="/search" className="searchButton">Search</Link>  </h2>

          {user ? (
            <div className="dropdown">
              <Link
                to="#"
                className="dropdown-toggle black"
                type="button"
                id="dropDownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <figure className="avatar">
                  {user.avatar && <img src={user.avatar.url} alt={user.name} className="rounded-circle" />}
                </figure>
                <h3>{user.name}</h3>
              </Link>
              <div className="dropdown-menu" aria-aria-labelledby="dropDownMenuButton">

                {user && user.role !== 'admin'?(
              <Link className="drop-item text-danger" to="/order/me">Orders</Link>

                ):(
              <Link className="drop-item text-danger" to="/dashboard">Dashboard</Link>

                )}

              <Link className="drop-item text-danger" to="/profile">Profile</Link>
                <Link className="drop-item text-danger" to="/logout">Logout</Link>
              </div>
            </div>
            
          ) : <Link to="/login" className="login">Login</Link>}

          
          <div className="products">
            {products && products.map((product) =>
              <ProductCard key={product._id} product={product} />
            )}
          </div>

          <div className="paginationBox">
            <Pagination 
              activePage={currentPage} 
              itemsCountPerPage={resultPerPage} 
              totalItemsCount={productsCount} 
              onChange={setCurrentPageNo} 
              nextPageText="Next" 
              prevPageText="Prev" 
              firstPageText="1st" 
              lastPageText="Last" 
              itemClass="page-item" 
              linkClass="page-link" 
              activeClass="pageItemActive" 
            />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
