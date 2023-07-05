import React, { useEffect, useState } from "react";
import Loader from "../../loader/Loader";
import Card from "../../card/Card";
import OrderDetail from "../../../pages/orderDetail/OrderDetail";
import { useParams } from "react-router-dom";
import styles from "./ChangeOrderStatus.module.scss";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { toast } from "react-toastify";
import useFetchSingleDoc from "../../../customHooks/useFetchSingleDoc";

const ChangeOrderStatus = () => {
  const { id } = useParams();
  const {data , isError , isLoading} = useFetchSingleDoc(id , 'orders')
  const [status, setStatus] = useState('');

  useEffect(() => {
  setStatus(data?.orderStatus)
  }, [data])

  const editOrder = async (e, id) => {
    e.preventDefault();
    try {
      const docRef = doc(db, "orders", id);
      await setDoc(docRef, { orderStatus: status }, { merge: true });
      toast.success("Order status is updated successfully");
    } catch (error) {
      toast.error("Order status not updated");
      toast.error(error.message);
    }
  };
  return (
    <>
      <OrderDetail fromPage="adminOrders" />

      <div className={styles.status}>
        <Card cardClass={styles.card}>
          <h4>Update Status</h4>
          <form onSubmit={(e) => editOrder(e, id)}>
            <span>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <option value="" disabled>
                  -- Choose one --
                </option>
                <option value="Order Placed...">Order Placed....</option>
                <option value="Processing...">Processing....</option>
                <option value="Shipped...">Shipped....</option>
                <option value="Delivered">Delivered</option>
              </select>
            </span>
            <span>
              <button type="submit" className="--btn --btn-primary">
                Update Status
              </button>
            </span>
          </form>
        </Card>
      </div>
    </>
  );
};

export default ChangeOrderStatus;
