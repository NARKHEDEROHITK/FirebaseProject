import { collectionGroup, doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { db } from '../../../firebase/config'
import spinnerImg from '../../../assets/loader.gif'
import styles from './ProductDetail.module.scss';
import Loader from '../../loader/Loader'
import { FaRupeeSign } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, decreaseQuantityCart } from '../../../redux/slices/CartSlice'
import useFetchDocByAuthId from '../../../customHooks/useFetchDocByAuthId'
import StarsRating from 'react-star-rate'
import Card from '../../card/Card'

const ProductDetail = () => {
  const dispatch = useDispatch()
  const {cartItems} = useSelector(state=>state.cart)
  const { id } = useParams()
  const {data ,  isError} = useFetchDocByAuthId(id , 'reviews' , 'ProductId')
  const [singleProduct, setSingleProduct] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [productFromCart, setProductFromCart] = useState(null)

  useEffect(() => {
   const item =  cartItems.find((item)=>item.id === id)
   if(!item){
    getSingleProduct()
   }else{
    setSingleProduct(item)
   }
  }, [cartItems , id ])



  const increaseCountByone = (product)=>{
    dispatch(addToCart(product))
  }
  const decreaseCountByone = (product)=>{
    console.log(product)
    dispatch(decreaseQuantityCart(product))
  }

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

                <div className={styles.count} style={{display:singleProduct?.quantity ? '':'none'}} >
                  <button className="--btn" onClick={()=>decreaseCountByone(singleProduct)} >-</button>
                  <p>
                    <b>{singleProduct?.quantity || 0}</b>
                  </p>
                  <button className="--btn" onClick={()=>increaseCountByone(singleProduct)} >+</button>
                </div>
                <button className="--btn --btn-danger" style={{display:singleProduct?.quantity ? 'none':''}}  onClick={()=>increaseCountByone(singleProduct)}>ADD TO CART</button>
              </div>
            </div>
          </>
        )}

        <Card cardClass={styles.card}>
          <h3>Product Reviews</h3>
        { console.log("data ",data) }
          <div>
            {data.length === 0 ? (
              <p>There are no reviews for this product yet.</p>
            ) : (
              <>
                {data.map((item, index) => {
                  const { rate, review, createdAt, userName } = item;
                  return (
                    <div key={index} className={styles.review}>
                      <StarsRating value={rate} />
                      <p>{review}</p>
          
                      <br />
                      <span>
                        <b>by: {userName}</b>
                      </span>
                    </div>
                  );
                })}
              </>
            )}
          </div>
        </Card>
      </div>
    </section>
  )
}

export default ProductDetail
