import React, { useContext, useState } from 'react'
import AuthContext from "../../../../context/Auth/AuthContex";
import { useNavigate } from 'react-router-dom';
import { getUserCartProducts } from '../../../utils/utils';
import data from '../../../../ProductData';
import { setDoc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import MinusIcon from "../../../UI/Icons/MinusIcon";
import PlusIcon from "../../../UI/Icons/PlusIcon";
import styles from "./productdetail.module.css";
const ProductDetail = ({title,price,productId,onCart,quantity,removeProductFromCart,updateProductQuantity,filterProductFromState}) => {
  const[productAddingToCart,setProductAddingToCart]=useState(false);
  const[productRemovingFromCart,setProductRemovingFromCart]=useState(false);
  const {user}=useContext(AuthContext);
  const navigate=useNavigate();
  
  const addToCart = async () => {
    setProductAddingToCart(true);
    // Redirect to login page if user is not authenticated
    if (!user) {
      return navigate("/signin");
    }

    try {
      const { data, docRef } = await getUserCartProducts(user.uid);

      // If cart exists then update the cart
      if (data && data.myCart[productId]) {
        const { myCart: cart } = data;
       
        const currentProductCount = cart[productId];
        const updatedCart = {
          ...cart,
          [productId]: currentProductCount + 1,
        };

        updateDoc(docRef, {
          myCart: updatedCart,
        });

        return toast.success("Increase product count!");
      }

      // Create a new cart if it does not exist
      const cart = data?.myCart || {};
      await setDoc(docRef, {
        myCart: { ...cart, [productId]: 1 },
      });

      toast.success("Product Added Successfully!");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setProductAddingToCart(false);
    }
  };
const removeProduct=async()=>{
  setProductRemovingFromCart(true);
  await removeProductFromCart(productId);
  setProductRemovingFromCart(false);
}
const handleAdd=async()=>{
  try {
    const{data,docRef}=await getUserCartProducts(user.uid);
    const{myCart:cart}=data;
    if(cart&&cart[productId]){
      const currentcount=cart[productId];
      const updatedCart={
        ...cart,
        [productId]:currentcount+1,
      };
      await updateDoc(docRef,{myCart:updatedCart});
      updateProductQuantity("add",productId);
      return;
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
}
 const handleRemove=async()=>{
  try {
    const {data,docRef} = await getUserCartProducts(user.uid);
    const {myCart:cart} = data;
    if(cart&&cart[productId]){
      const productcount=cart[productId]-1;
      const updatedCart ={
        ...cart,
        [productId]:productcount
      };
      if(productcount===0){
        delete updatedCart[productId];
      }
      await updateDoc(docRef,{myCart:updatedCart});
      if(productcount===0){
        return filterProductFromState(productId);
      }
      updateProductQuantity("remove",productId);
      return;
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
 }

 return (
  <div className={styles.productDetails}>
    <div className={styles.productName}>
      <p>{`${title.slice(0, 35)}...`}</p>
    </div>
    <div className={styles.productOptions}>
      <p>₹ {price}</p>
      {onCart && (
        <div className={styles.quantityContainer}>
          <MinusIcon handleRemove={handleRemove} />
          {quantity}
          <PlusIcon handleAdd={handleAdd} />
        </div>
      )}
    </div>
    {!onCart ? (
      <button
        className={styles.addBtn}
        title="Add to Cart"
        disabled={productAddingToCart}
        onClick={addToCart}
      >
        {productAddingToCart ? "Adding" : "Add To Cart"}
      </button>
    ) : (
      <button
        className={styles.removeBtn}
        title="Remove from Cart"
        onClick={removeProduct}
      >
        {productRemovingFromCart ? "Removing" : "Remove From Cart"}
      </button>
    )}
  </div>
);
}

export default ProductDetail;