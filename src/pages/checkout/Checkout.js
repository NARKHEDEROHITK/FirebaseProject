import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { CheckoutFunctions } from "../../Helper/Helper";
import CheckoutForm from "../../components/CheckoutForm/CheckoutForm";


const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const Checkout = () => {
  const [message, setMessage] = useState("Initializing checkout...");
  const [clientSecret, setClientSecret] = useState("");

  const {cartItems} = useSelector(state=>state.cart);
  const {email} = useSelector(state=>state.auth);
  const {shippingAddress} = useSelector(state=>state.checkout);


  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(CALCULATE_SUBTOTAL());
  //   dispatch(CALCULATE_TOTAL_QUANTITY());
  // }, [dispatch, cartItems]);

  const description = `eShop payment: email: ${email}, Amount: ${CheckoutFunctions.CALCULATE_TOTAL_CARTITEMS(cartItems)}`;

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:4242/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: cartItems,
        userEmail: email,
        shipping: shippingAddress,
        billing: shippingAddress,
        description,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return res.json().then((json) => Promise.reject(json));
      })
      .then((data) => {
        setClientSecret(data.clientSecret);
      })
      .catch((error) => {
        setMessage("Failed to initialize checkout");
        toast.error("Something went wrong!!!");
      });
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <>
      <section>
        <div className="container">{!clientSecret && <h3>{message}</h3>}</div>
      </section>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
};

export default Checkout;