import React, { useEffect, useMemo } from "react";
import styles from "./Home.module.scss";
import InfoBox from "../infobox/InfoBox";
import { AiFillDollarCircle } from "react-icons/ai";
import { BsCart4 } from "react-icons/bs";
import { FaCartArrowDown, FaRupeeSign } from "react-icons/fa";
import { useSelector } from "react-redux";
import UseFetchCollection from "../../../customHooks/useFetchCollection";
import { useState } from "react";

//Icons
const earningIcon = <FaRupeeSign size={30} color="#b624ff" />;
const productIcon = <BsCart4 size={30} color="#1f93ff" />;
const ordersIcon = <FaCartArrowDown size={30} color="orangered" />;

const Home = () => {
  const { data: orders, isLoading } = UseFetchCollection("orders");
  const { data: products, isLoading: productLoading } =
    UseFetchCollection("products");

  const totalOrderAmount  = useMemo(() =>{
    return  orders
    .map((item) => item.cartItems)
    .flat(1)
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
  }, [orders])


  return (
    <div className={styles.home}>
      <h2>Admin Home</h2>
      <div className={styles["info-box"]}>
        <InfoBox
          cardClass={`${styles.card} ${styles.card1}`}
          title={"Earnings"}
          count={`${totalOrderAmount}`}
          icon={earningIcon}
        />
        <InfoBox
          cardClass={`${styles.card} ${styles.card2}`}
          title={"Products"}
          count={products.length}
          icon={productIcon}
        />
        <InfoBox
          cardClass={`${styles.card} ${styles.card3}`}
          title={"Orders"}
          count={orders.length}
          icon={ordersIcon}
        />
      </div>
      <div>{/* <Chart /> */}</div>
    </div>
  );
};

export default Home;
