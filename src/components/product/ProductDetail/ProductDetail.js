import { doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { db } from '../../../firebase/config'
import spinnerImg from '../../../assets/loader.gif'
import styles from './ProductDetail.module.scss';
import Loader from '../../loader/Loader'
import { FaRupeeSign } from 'react-icons/fa'

const ProductDetail = () => {
  const { id } = useParams()
  const [singleProduct, setSingleProduct] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    getSingleProduct()
  }, [id])

  const getSingleProduct = async () => {
    try {
      setIsLoading(true)
      const docRef = doc(db, "products", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setSingleProduct({...docSnap.data() , id: docSnap.id})
        setIsLoading(false)
      } else {
        toast.error("There is no such product avaialable")
        setIsLoading(true)
      }
    } catch (error) {
      toast.error(error.message)
      setIsLoading(false)
    }
  }

  return (
    <section>
      {/* {isLoading && <Loader/>} */}
      <div className={`container ${styles.product}`}>
        <h2>Product Details</h2>
        <div>
          <Link to="/#products">&larr; Back To Products</Link>
        </div>
        {singleProduct === null ? (
          <h3>There is not Such Product Found</h3>
        ) : (
          <>
            <div className={styles.details}>
              <div className={styles.img}>
                <img src={singleProduct.imageURL} alt={singleProduct.name} />
              </div>
              <div className={styles.content}>
                <h3>{singleProduct.name}</h3>
                <p className={styles.price}><FaRupeeSign /> {singleProduct.price}</p>
                <p>{singleProduct.desc}</p>
                <p>
                  <b>SKU</b> {singleProduct.id}
                </p>
                <p>
                  <b>Brand</b> {singleProduct.brand}
                </p>

                <div className={styles.count}>
                  <button className="--btn">-</button>
                  <p>
                    <b>1</b>
                  </p>
                  <button className="--btn">+</button>
                </div>
                <button className="--btn --btn-danger">ADD TO CART</button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default ProductDetail
