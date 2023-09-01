import React from 'react'
import ProductContainer from "../ProductContainer/ProductConatiner";
import ProductImage from "../ProductContainer/ProductImage/ProductImage";
import ProductDetail from "../ProductContainer/ProductDetail/ProductDetail";

const ProductCard = ({
  product: { title, price, image, id, quantity },
  onOwnPage,
  onCart,
  removeProductFromCart,
  updateProductQuantity,
  filterProductFromState,}) => {
  return (
    <ProductContainer>
    <ProductImage image={image} />
    <ProductDetail
      title={title}
      price={price}
      onOwnPage={onOwnPage}
      productId={id}
      onCart={onCart}
      quantity={quantity}
      removeProductFromCart={removeProductFromCart}
      updateProductQuantity={updateProductQuantity}
      filterProductFromState={filterProductFromState}
    />
    </ProductContainer>
  )
}

export default ProductCard;