import React, { useEffect, useState } from "react";
import styles from "./ProductList.module.scss";
import { BsFillGridFill } from "react-icons/bs";
import { FaListAlt } from "react-icons/fa";
import Search from "../../Search/Search";
import ProductItem from "../ProductItem/ProductItem";
import { useDispatch, useSelector } from "react-redux";
import { SET_FILTER_OBJECT } from "../../../redux/slices/ProductsSlice";
import Pagination from "../../Pagination/Pagination";



const ProductList = ({ filterProduct }) => {
const dispatch =   useDispatch()
const [grid, setGrid] = useState(true);
const {filterObject} = useSelector(state=>state.products)


const handelChangeOnFilterSorting = (e) => {
  dispatch(SET_FILTER_OBJECT({...filterObject , sort:e.target.value}))
}

const onSearchChange = (e) => {
  dispatch(SET_FILTER_OBJECT({...filterObject , search:e.target.value}))
}

  return (

    <>

      <div className={styles["product-list"]} id="product">
        <div className={styles.top}>
          <div className={styles.icons}>
            <BsFillGridFill
              size={22}
              color="orangered"
              onClick={() => setGrid(true)}
            />

            <FaListAlt size={24} color="#0066d4" onClick={() => setGrid(false)} />

            <p>
              <b>{filterProduct.length}</b> Products found.
            </p>
          </div>
          {/* Search Icon */}
          <div>
            <Search value={filterObject.search} onChange={onSearchChange} />
          </div>
          {/* Sort Products */}
          <div className={styles.sort}>
            <label>Sort by:</label>
            <select onChange={handelChangeOnFilterSorting}>
              <option value="latest">Latest</option>
              <option value="lowest-price">Lowest Price</option>
              <option value="highest-price">Highest Price</option>
              <option value="a-z">A - Z</option>
              <option value="z-a">Z - A</option>
            </select>
          </div>
        </div>

        <div className={grid ? `${styles.grid}` : `${styles.list}`}>
          {filterProduct.length === 0 ? (
            <h1>No product found.</h1>
          ) : (
            <>
              {filterProduct.map((product) => {
                return (
                  <div key={product.id}>
                    <ProductItem grid={grid} product={product} />
                  </div>
                );
              })}
            </>
          )}
        </div>

        {filterProduct.length && <Pagination/>}
      </div >

    </>


  );
};

export default ProductList;