import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styles from './ProductItem.module.scss';
import Card from '../../card/Card'
import { FaRupeeSign } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../../redux/slices/CartSlice';
import { toast } from 'react-toastify';

const ProductItem = ({ grid, product }) => {
  const navigate = useNavigate()
  const { isLoggedIn } = useSelector(state=>state.auth)
  const dispatch = useDispatch()
  const { id, name, desc, price, imageURL } = product;

  function shortenText(name, size) {
    if (name.length > size) {
      return `${name.slice(0, size)} ...`;
    }
    return name
  }

  const hadelAddToCart = (data) => {
    if(isLoggedIn){
      dispatch(addToCart(data))
    }else{
      navigate('/login')
      toast.warn("Please login before add Product")
    }
   
  }

  return (
    <Card cardClass={grid ? `${styles.grid}` : `${styles.list}`}>
      <Link to={`/product-details/${id}`}>
        <div className={styles.img}>
          <img src={imageURL} alt={name} />
        </div>
      </Link>
      <div className={styles.content}>
        <div className={styles.details}>
          <p><FaRupeeSign /> {price}</p>
          <h4>{grid ? shortenText(name, 18) : name}</h4>
        </div>
        {!grid && <p className={styles.desc}>{shortenText(desc, 200)}</p>}

        <button className="--btn --btn-danger" onClick={()=>hadelAddToCart(product)} >Add To Cart</button>
      </div>
    </Card>
  )
}

export default ProductItem
