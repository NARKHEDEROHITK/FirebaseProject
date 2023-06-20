import React, { useEffect, useState } from 'react'
import styles from './ProductFilter.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { SET_FILTER_OBJECT } from '../../../redux/slices/ProductsSlice';
import { BiRupee } from 'react-icons/bi';
import { FaRupeeSign } from 'react-icons/fa';
import { addDoc, collection, doc, getDoc, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../../firebase/config';
import { toast } from 'react-toastify';

const ProductFilter = () => {
  const { email, userId, userName } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const [price, setPrice] = useState(Infinity)
  const { products, filterObject, filterProduct } = useSelector(state => state.products)
  const priceArray = [...products.map(prod => prod.price)]
  const maxPrice = Math.max(...priceArray)
  const minPrice = Math.min(...priceArray)
  useEffect(() => {
    setPrice(maxPrice)
  }, [minPrice, maxPrice])




  const allCategories = ['All',
    ...new Set(products.map(prod => prod.category))
  ]

  const allBrands = ['All',
    ...new Set(products.map(prod => prod.brand))
  ]

  const onBrandChange = (e) => {
    dispatch(SET_FILTER_OBJECT({ ...filterObject, brand: e.target.value }))
  }

  const handelChangeOnCatgory = (e) => {
    dispatch(SET_FILTER_OBJECT({ ...filterObject, category: e.target.value }))
  }

  const handelPriceChange = (e) => {
    setPrice(e.target.value)
    dispatch(SET_FILTER_OBJECT({ ...filterObject, price: e.target.value }))
  }

  const handelOnClearFilter = async () => {
    dispatch(SET_FILTER_OBJECT({
      search: "",
      category: "All",
      brand: "All",
      sort: "latest",
      price: Infinity
    }))
  }

  return (
    <div className={styles.filter}>
      <h4>Categories</h4>
      <div className={styles.category}>
        {allCategories.map(cat => <button type='button' className={filterObject.category === cat ? styles.active : null} onClick={handelChangeOnCatgory} key={cat} value={cat}>{cat}</button>)}
      </div>
      <h4>Brand</h4>
      <div className={styles.brand}>
        <select name="brand" value={filterObject.brand} onChange={onBrandChange} >
          {allBrands.map(brand => <option key={brand} value={brand}>{brand}</option>)}
        </select>
        <h4>Price</h4>
        <p >
           {filterProduct.length > 0 ? <span> <FaRupeeSign /> {price} </span> : null}</p>
        <div className={styles.price} style={{ display: 'flex' }}>
          {/* <p style={{ fontSize: '12px' }}>{filterProduct.length > 0 ? minPrice : null}</p> */}
           <input type="range" name="price" min={minPrice} max={maxPrice} value={price} onChange={handelPriceChange} /> 
          {/* <p style={{ fontSize: '12px' }}>{filterProduct.length > 0 ? maxPrice : null}</p> */}
        </div>
        <br />
        <button type='button' onClick={handelOnClearFilter} className="--btn --btn-danger">Clear Filter</button>
      </div>
    </div>
  )
}

export default ProductFilter
