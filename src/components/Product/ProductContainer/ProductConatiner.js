import React from 'react'
import styles from "./productcontainer.module.css";
const ProductConatiner = ({children}) => {
  return (
    <div className={styles.productContainer}>
        {children}
    </div>
  )
}

export default ProductConatiner;