import React, { useState } from "react";
import styles from "./ReviewProduct.module.scss";
import Card from "../../components/card/Card";
import StarsRating from "react-star-rate";
import useFetchSingleDoc from "../../customHooks/useFetchSingleDoc";
import { useNavigate, useParams } from "react-router-dom";
import spinnerImg from "../../assets/loader.gif";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/config";
import Loader from "../../components/loader/Loader";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const ReviewProduct = () => {
  const navigate = useNavigate()
  const {userId , userName} = useSelector(state=>state.auth)
  const { id } = useParams();
  const { data, isError, isLoading } = useFetchSingleDoc(id, "products");
  const [rate, setRate] = useState(0);
  const [review, setReview] = useState('');
  const [loading, setloading] = useState(false)

  const submitReview = async (e) => {
    e.preventDefault()
    console.log(data, rate, review)
    setloading(true)
    try {
      await addDoc(collection(db, "reviews"), {
        ProductId:id,
        createdAt: Timestamp.now().toDate(),
        rate:rate,
        review:review,
        UserId: userId,
        userName:userName
      });
      setloading(false)
      navigate('/')
      toast.success("Thanks for Rating")
    } catch (error) {
      setloading(false)
      toast.error(error.message)
    }
  };

  return (
    <section>
    {loading && <Loader/>}
      <div className={`container ${styles.review}`}>
        <h2>Review Products</h2>
        {data === null ? (
          <img src={spinnerImg} alt="Loading..." style={{ width: "50px" }} />
        ) : (
          <>
            <p>
              <b>Product name:</b> {data.name}
            </p>
            <img
              src={data.imageURL}
              alt={data.name}
              style={{ width: "100px" }}
            />
          </>
        )}

        <Card cardClass={styles.card}>
          <form onSubmit={(e) => submitReview(e)}>
            <label>Rating:</label>
            <StarsRating
              value={rate}
              onChange={(rate) => {
                setRate(rate);
              }}
            />
            <label>Review</label>
            <textarea
              value={review}
              required
              onChange={(e) => setReview(e.target.value)}
              cols="30"
              rows="10"
            ></textarea>
            <button type="submit" className="--btn --btn-primary">
              Submit Review
            </button>
          </form>
        </Card>
      </div>
    </section>
  );
};

export default ReviewProduct;
