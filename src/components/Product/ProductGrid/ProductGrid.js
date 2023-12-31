import React from 'react'
import styles from "./productgrid.module.css";
const ProductGrid = ({children,style}) => {
  return (
    <div className={styles.grid} style={{...style}}>{children}</div>
  )
}

export default ProductGrid