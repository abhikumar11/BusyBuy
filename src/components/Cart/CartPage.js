import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AuthContext from "../../context/Auth/AuthContex";
import { getProductById, getUserCartProducts } from '../utils/utils';
import { toast } from 'react-toastify';
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../FirebaseConfig';
import ProductList from '../Product/ProductList/ProductList';
import styles from "./cartpage.module.css";
import Loader from "../UI/Loader/Loader";
const CartPage = () => {
  const[cartProducts,setCartProducts]=useState([]);
  const[cartProductsMap, setCartProductsMap]=useState([]);
  const[purchasing,setPurchasing]=useState(false);
  const[loading,setLoading]=useState(false);
  const navigate=useNavigate();
  let total=cartProducts.reduce((acc,product) =>{
    return acc+product.price*product.quantity;
  },0);

  const {user}=useContext(AuthContext);
  useEffect(()=>{
    getCartProducts(user?.uid);
  },[]);
  const getCartProducts=async(uid) =>{
    setLoading(false);
    try {
      const {data}=await getUserCartProducts(uid);
      const { myCart: cart } = data;
      setCartProductsMap(cart);
      const productData=await getProductById(cart);
      if(!productData){
        return toast.error("No product in cart");
      }
      setCartProducts(productData);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }finally{
      setLoading(false);
    }
  }
  const purchaseProduct=async()=>{
    setPurchasing(true);
    try {
      const docRef=doc(db,"userOrders",user.uid);
      const docSnap=await getDoc(docRef);
      const data=docSnap.data();
      if(data){
        updateDoc(docRef,{orders:arrayUnion({...cartProductsMap,date:Date.now()})});
        clearUserCartAndRedirectToOrdersPage();
        return;
      }
      await setDoc(docRef,{orders:[{...cartProductsMap,date:Date.now()}]});
      clearUserCartAndRedirectToOrdersPage();
    } catch (error) {
      console.log(error);
    } finally {
      setPurchasing(false);
    }
  }
  const clearUserCartAndRedirectToOrdersPage = async () => {
    const userCartRef = doc(db, "usersCarts", user.uid);

    updateDoc(userCartRef, {myCart: {}});

    setCartProducts([]);
    setCartProductsMap({});

    navigate("/myorders");
  };
  const updateProductQuantity = (type, id) => {
    let tempCart = cartProducts.map((product) => {
      if (product.id === id) {
        product.quantity += type === "add" ? 1 : -1;
      }
      return product;
    });
    cartProductsMap[id] += type === "add" ? 1 : -1;
    setCartProducts(tempCart);
  };
  const filterProductFromState = (productId) => {
    delete cartProductsMap[productId];
    setCartProducts((prevCartProducts) => {
      return prevCartProducts.filter((product) => {
        return product.id !== productId;
      });
    });
  };
  const removeProductFromCart = async (productId) => {
    try {
      const { data, docRef } = await getUserCartProducts(user.uid);

      const { myCart: cart } = data;

      if (!cart[productId]) {
        return toast.error("Product not in cart!");
      }

      delete cart[productId];

      await updateDoc(docRef, {
        myCart: {
          ...cart,
        },
      });

      filterProductFromState(productId);

      toast.success("Product Removed Successfully!");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }; 
  if (loading) return <Loader />;
  return (
    <div className={styles.cartPageContainer}>
    {!!cartProducts.length && (
      <aside className={styles.totalPrice}>
        <p>TotalPrice:- ₹{total}/-</p>
        <button className={styles.purchaseBtn} onClick={purchaseProduct}>
          {purchasing ? "Purchasing" : "Purchase"}
        </button>
      </aside>
    )}
    {!!cartProducts.length ? (
      <ProductList
        products={cartProducts}
        removeProductFromCart={removeProductFromCart}
        updateProductQuantity={updateProductQuantity}
        filterProductFromState={filterProductFromState}
        onCart
      />
    ) : (
      <h1>Cart is Empty!</h1>
    )}
  </div>
);
}

export default CartPage;