import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  CLEAR_ERRORS
} from "../constants/productConstants";

const initialState = {
  products: [],
  loading: false,
  error: null,
  productsCount: 0
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true
      };
    case ALL_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload.products,
        productsCount: action.payload.productsCount
      };
    case ALL_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null
      };
    default:
      return state; // Return current state for unknown action types
  }
};

export default productReducer;
