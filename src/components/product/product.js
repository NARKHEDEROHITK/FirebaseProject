import React, { useEffect, useState } from 'react'
import styles from './Product.module.scss';
import ProductList from './ProductList/ProductList';
import ProductFilter from './ProductFilter/ProductFilter';
import { useDispatch, useSelector } from 'react-redux';
import { STORE_PRODUCTS } from '../../redux/slices/ProductsSlice';
import UseFetchCollection from '../../customHooks/useFetchCollection'
import spinnerImg from '../../assets/loader.gif'
import { FaCogs } from 'react-icons/fa';
import { SET_CURRENTPAGE } from '../../redux/slices/PaginationSlice';

const Product = () => {

  const dispatch = useDispatch()
  const [filterAllProducts, setFilterAllProducts] = useState([])
  const [showFilter, setShowFilter] = useState(false);
  const { data, isLoading } = UseFetchCollection("products")
  const { products, filterProduct } = useSelector(state => state.products)
  const { currentPage, productPerPage } = useSelector(state => state.pagination)

  useEffect(() => {
    dispatch(STORE_PRODUCTS(data))
  }, [data])

  useEffect(() => {
    setFilterAllProducts(filterProduct.slice((currentPage - 1) * productPerPage, productPerPage * (currentPage === 1 ? 1 : currentPage)))
  }, [currentPage, filterProduct])

  useEffect(() => {
    dispatch(SET_CURRENTPAGE({ currentPage: 1 }))
  }, [filterProduct])

  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };

  return (
    <section>
      <div className={`container ${styles.product}`}>
        <aside
          className={
            showFilter ? `${styles.filter} ${styles.show}` : `${styles.filter}`
          }
        >
          {isLoading ? null : <ProductFilter />}
        </aside>
        <div className={styles.content}>
          {isLoading ? (
            <img
              src={spinnerImg}
              alt="Loading.."
              style={{ width: "50px" }}
              className="--center-all"
            />
          ) : (
            <ProductList filterProduct={filterAllProducts} />
          )}
          <div className={styles.icon} onClick={toggleFilter}>
            <FaCogs size={20} color="orangered" />
            <p>
              <b>{showFilter ? "Hide Filter" : "Show Filter"}</b>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Product
