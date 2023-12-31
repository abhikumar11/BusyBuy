import React from "react";
import styles from "./productimage.module.css";
const ProductImage = ({ image }) => {
     return (
          <div className={styles.imageContainer}>
               <img
                    src={image}
                    alt="Product"
                    width="100%"
                    height="100%"
                    style={{ objectFit: "contain" }}
               />
          </div>
     );
};

export default ProductImage;
