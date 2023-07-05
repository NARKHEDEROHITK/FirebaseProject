import React from 'react'
import { Link, useParams } from 'react-router-dom';
import useFetchSingleDoc from '../../customHooks/useFetchSingleDoc';
import styles from './OrderDetail.module.scss';
import spinnerImg from '../../assets/loader.gif'
import { FaRupeeSign } from 'react-icons/fa'


const OrderDetail = () => {

    const {id} = useParams()

    const {data , isError , isLoading} = useFetchSingleDoc(id , 'orders')
    console.log(data , isError , isLoading)

  return (
    <section>
      <div className={`container ${styles.table}`}>
        <h2>Order Details</h2>
        <div>
           <Link to="/order-history">&larr; Back To Orders</Link>
        </div>
        <br />
        {data === null ? (
          <img src={spinnerImg} alt="Loading..." style={{ width: "50px" }} />
        ) : (
          <>
            <p>
              <b>Order ID : {data.id}</b>
            </p>
            <p>
              <b>Order Amount : <FaRupeeSign/> {data.orderAmount}</b>
            </p>
            <p>
              <b>Order Status : {data.orderStatus}</b>
            </p>
            <br />
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
                {data.cartItems.map((cart, index) => {
                  const { id, name, price, imageURL, quantity } = cart;
                  return (
                    <tr key={id}>
                      <td>
                        <b>{index + 1}</b>
                      </td>
                      <td>
                        <p>
                          <b>{name}</b>
                        </p>
                        <img
                          src={imageURL}
                          alt={name}
                          style={{ width: "100px" }}
                        />
                      </td>
                      <td>{price}</td>
                      <td>{quantity}</td>
                      <td>{(price * quantity).toFixed(2)}</td>
                      <td className={styles.icons}>
                        <Link to={`/review-product/${id}`}>
                          <button className="--btn --btn-primary">
                            Review Product
                          </button>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}
      </div>
    </section>
  )
}

export default OrderDetail