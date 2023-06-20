import styles from "./Auth.module.scss";
import { Link } from "react-router-dom";
import resetImg from "../../assets/forgot.png";
import Card from "../../components/card/Card";
import { useState } from "react";
import { auth } from "../../firebase/config";
import { sendPasswordResetEmail } from "firebase/auth";
import Loader from "../../components/loader/Loader";
import { toast } from 'react-toastify';


const Reset = () => {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handelOnResetPassword = (e) => {
    e.preventDefault()
    setIsLoading(true)
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success("Send link Successful")
        setIsLoading(false)
      })
      .catch((error) => {
        toast.error(error.message)
        setIsLoading(false)
      });
  }

  return (
    <>
      {isLoading && <Loader />}
      <section className={`container ${styles.auth}`}>
        <div className={styles.img}>
          <img src={resetImg} alt="Reset Password" width="400" />
        </div>

        <Card>
          <div className={styles.form}>
            <h2>Reset Password</h2>

            <form onSubmit={handelOnResetPassword}>
              <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />

              <button className="--btn --btn-primary --btn-block">
                Reset Password
              </button>
              <div className={styles.links}>
                <p>
                  <Link to="/login">- Login</Link>
                </p>
                <p>
                  <Link to="/register">- Register</Link>
                </p>
              </div>
            </form>
          </div>
        </Card>
      </section>
    </>
  );
};

export default Reset;