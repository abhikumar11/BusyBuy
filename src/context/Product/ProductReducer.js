import React from 'react'
import {SET_PRODUCTS,SET_CART_PRODUCTS,SET_ERROR,SET_FILTERED_PRODUCTS,TOGGLE_LOADING} from './ProductType';
import ProductContext from './ProductContext';

const ProductReducer = (state,action) => {
 switch (action.type) {
    case SET_PRODUCTS:
        return{...state,loading:false,products:action.payload,filteredProducts: action.payload};
    case SET_FILTERED_PRODUCTS:
        return{...state,filteredProducts:action.payload};
    case SET_CART_PRODUCTS:
        return{...state,cartProducts:action.payload};
    case SET_ERROR:
        return{...state,error:action.payload,loading:false};
    case TOGGLE_LOADING:
        return{...state,loading:!state.loading};
        default:
        return state;
 }
}

export default ProductReducer;