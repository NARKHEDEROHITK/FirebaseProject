import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Cart.module.scss";
import { FaTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Card from '../../components/card/Card'
import { FaRupeeSign } from 'react-icons/fa'
import { addToCart, clearCart, decreaseQuantityCart, deleteProductCart } from "../../redux/slices/CartSlice";
import Notiflix from "notiflix";
import { toast } from "react-toastify";
import { CheckoutFunctions } from "../../Helper/Helper";


const Cart = () => {
  const dispatch = useDispatch()
  const [total, setTotal] = useState(0)
  const { cartItems } = useSelector(state => state.cart)
  useEffect(() => {
    setTotal(CheckoutFunctions.CALCULATE_TOTAL_CARTITEMS(cartItems))
  }, [cartItems])

  const handelIncreaseQuantity = (data) => {
    dispatch(addToCart(data))
  }

  const handelDecreaseQuantity = (data) => {
    dispatch(decreaseQuantityCart(data))
  }

  const handelDeleteProduct = (item) => {
    Notiflix.Confirm.show(
      'Are You Want to Delete Product?',
      'Are you sure?',
      'Delete',
      'Cancel',
      () => {
        dispatch(deleteProductCart(item))
      },
      () => {
        toast.success("Your Product is safe")
      },
      {
        titleColor: 'red',
        backgroundColor: 'lightblue',
        cancelButtonBackground: 'green',
        okButtonBackground: 'red',
        okButtonColor: 'white',
        cancelButtonColor: 'white',
        messageColor: 'red'
      }
    );


  }

  const handelclearCart = () => {
    dispatch(clearCart())
  }

  return (
    <section>
      <div className={`container ${styles.table}`}>
        <h2>Shopping Cart</h2>
        {
          cartItems.length == 0 ?
            <>
              <p>Your cart is currently empty.</p>
              <br />
              <div>
                <Link to="/#products">&larr; Continue shopping</Link>
              </div>
            </> :
            <>
              <table>
                <thead>
                  <tr>
                    <th>s/n</th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>

                  {cartItems.map((item, index) => {
                    const { name, imageURL, price, quantity, brand, category, image, id } = item
                    return <tr key={id}>
                      <td > {index + 1}</td>
                      <td>
                        <p>
                          <b>{name}</b>
                        </p>
                        <img
                          src={imageURL}
                          alt={image}
                          style={{ width: "100px" }}
                        />
                      </td>
                      <td>{price}</td>
                      <td>
                        <div className={styles.count}>
                          <button className="--btn" style={{ color: 'red', backgroundColor: 'lightblue' }} onClick={() => handelDecreaseQuantity(item)} > - </button>
                          <p>
                            <b>{quantity}</b>
                          </p>
                          <button onClick={() => handelIncreaseQuantity(item)}
                            className="--btn" style={{ color: 'green', backgroundColor: 'lightblue' }}>  + </button>
                        </div>
                      </td>
                      <td>{price * quantity}</td>
                      <td className={styles.icons}>
                        <FaTrashAlt
                          size={19}
                          color="red"
                          onClick={() => handelDeleteProduct(item)}
                        />
                      </td>
                    </tr>
                  })}

                </tbody>
              </table>
              <div className={styles.summary}>
                <button className="--btn --btn-danger" onClick={() => handelclearCart()} >
                  Clear Cart
                </button>
                <div className={styles.checkout}>
                  <div>
                    <Link to="/#products">&larr; Continue shopping</Link>
                  </div>
                  <br />
                  <Card cardClass={styles.card}>
                    <p>
                      <b> {`Cart item(s): ${cartItems.length}`}</b>
                    </p>
                    <div className={styles.text}>
                      <h4>Subtotal:</h4>
                      <h3><FaRupeeSign size={18} /> {total}</h3>
                    </div>
                    <p>Tax an shipping calculated at checkout</p>
                    <Link to={'/checkout-details'} >
                      <button
                        className="--btn --btn-primary --btn-block"

                      >
                        Checkout
                      </button></Link>
                  </Card>
                </div>
              </div>
            </>
        }

      </div >
    </section >
  );
};

export default Cart;