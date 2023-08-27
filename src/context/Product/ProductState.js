import React, { useReducer } from 'react'
import ProductContext from './ProductContext';
import ProductReducer from './ProductReducer';
import { SET_ERROR, SET_FILTERED_PRODUCTS, SET_PRODUCTS, TOGGLE_LOADING } from './ProductType';
import { db } from '../../FirebaseConfig';
import { collection, getDoc, query } from 'firebase/firestore';
const ProductState = ({children}) => {
    const initialState ={
        products:[],
        carProducts:[],
        filteredProducts:[],
        loading:false,
        error:""
    }
    const [state,dispatch] = useReducer(initialState,ProductReducer);
    const getProducts=async()=>{
            try {
                dispatch({type:TOGGLE_LOADING});
                const productRef=collection(db,"products");
                const productSnapshot = await getDoc(query(productRef));
                const productData=productSnapshot.docs.map((doc)=>({
                    ...doc.data(),
                }));
                dispatch({type:SET_PRODUCTS,payload:productData});
            } catch (error) {
                dispatch({type:SET_ERROR,payload:error.message});
            }
    }
    const filterProduct=(filterobj)=>{
            const {searchQuery,priceRange,categories:{men,women,jewelery,electronics}}=filterobj;
            let items=state.products;
            if(searchQuery){
                items=items.filter((product)=>{
                    return product.title.toLowerCase().includes(searchQuery.toLowerCase());
                });
            }
            if(men||women||jewelery||electronics)
            {
                items=items.filter((product)=>{
                    if(men&&product.category==="men"){
                        return true;
                    }
                    if(women&&product.category==="women"){
                        return true;
                    }
                    if(electronics&&product.category==="electronics"){
                        return true;
                    }
                    if(jewelery&&product.category==="jewelery"){
                        return true;
                    }
                    return false;
                });
                if(priceRange){
                    items=items.filter((product)=>{
                        return product.price<priceRange;
                    });
                }
                dispatch({type:SET_FILTERED_PRODUCTS,payload:items});
            }
    }
  return (
    <ProductContext.Provider value={{
        products:state.products,
        filteredProducts:state.filteredProducts,
        loading:state.loading,
        getProducts,
        filterProduct
    }}>
        {children}
    </ProductContext.Provider>
  )
}

export default ProductState;