import React from 'react'
import useFetchDocByAuthId from '../../customHooks/useFetchDocByAuthId'
import { useSelector } from 'react-redux'
import Loader from '../../components/loader/Loader'
import styles from './OrderHistory.module.scss';
import { FaRupeeSign } from 'react-icons/fa'
const OrderHistory = () => {
    const {userId} = useSelector(state=>state.auth)
    console.log(userId)
    const {data , isError , isLoading} = useFetchDocByAuthId(userId , 'orders')
    console.log(data , isError , isLoading)
    let filteredOrders = []

    const handleClick = ()=>{}

  return (
   <>
     {isLoading && <Loader/>}
     {isError && <h1>Something went wrong</h1>}
     <section>
      <div className={`container ${styles.order}`}>
        <h2>Your Order History</h2>
        <p>
          Open an order to leave a <b>Product Review</b>
        </p>
        <br />
        <>
          {isLoading && <Loader />}
          <div className={styles.table}>
            {data.length === 0 ? (
              <p>No order found</p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>s/n</th>
                    <th>Date</th>
                    <th>Order ID</th>
                    <th>Order Amount</th>
                    <th>Order Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((order, index) => {
                    const {
                      Id,
                      orderDate,
                      orderTime,
                      orderAmount,
                      orderStatus,
                    } = order;
                    return (
                      <tr key={Id} onClick={() => handleClick(Id)}>
                        <td>{index + 1}</td>
                        <td>
                          {orderDate} at {orderTime}
                        </td>
                        <td>{Id}</td>
                        <td>
                        <FaRupeeSign/>
                          {orderAmount}
                        </td>
                        <td>
                          <p
                            className={
                              orderStatus !== "Delivered"
                                ? `${styles.pending}`
                                : `${styles.delivered}`
                            }
                          >
                            {orderStatus}
                          </p>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </>
      </div>
    </section>
   </>
    
  )
}

export default OrderHistory
