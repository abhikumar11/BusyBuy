import React, { useContext, useEffect } from "react";
import { useState } from "react";
import ProductContext from "../../context/Product/ProductContext";
import Loader from "../UI/Loader/Loader";
import FilterSideBar from "../FilterSiderBar/FilterSideBar";
import styles from "./homepage.module.css";
import ProductList from "../Product/ProductList/ProductList";
import { addData } from "../utils/utils";

const HomePage = () => {
     const [query, setQuery] = useState("");
     const [priceRange, setPriceRange] = useState(7000);
     const [categories, setCategories] = useState({
          men: false,
          women: false,
          jewelery: false,
          electronics: false,
     });
     const { products, filteredProducts, loading, getProducts, filterProduct } =
          useContext(ProductContext);

     useEffect(() => {
          //addData();
          getProducts();
     }, []);
     useEffect(() => {
          filterProduct({ priceRange, searchQuery: query, categories });
     }, [priceRange, query, categories]);

     if (loading) {
          <Loader />;
     }
     
     return (
          <div>
               <FilterSideBar
                    setCategories={setCategories}
                    setPriceRange={setPriceRange}
                    priceRange={priceRange}
               />

               <form className={styles.form}>
                    <input
                         type="search"
                         placeholder="Search By Name"
                         className={styles.searchInput}
                         value={query}
                         onChange={(e) => setQuery(e.target.value)}
                    />
               </form>
               {products.length ? (
                    
                    <ProductList
                         products={products.length ? filteredProducts : null}
                    />
               ) : null}
          </div>
     );
};

export default HomePage;
