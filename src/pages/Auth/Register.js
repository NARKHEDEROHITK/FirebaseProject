import styles from "./Auth.module.scss";
import registerImg from "../../assets/register.png";
import Card from "../../components/card/Card";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Loader from '../../components/loader/Loader'
import {auth} from '../../firebase/config'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";
import { createCart } from "../../redux/slices/CartSlice";


const Register = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [cPassword, setCPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handelOnSubmit = (e) => {
   
    e.preventDefault()
  
    if (password !== cPassword) {
      toast.error("password is not matches")
      return
    }
      setIsLoading(true)
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user)
          setIsLoading(false)
          toast.success("Register Successful")
          setEmail("")
          setPassword("")
          setCPassword("")
          dispatch(createCart(user))
          navigate("/")
        })
        .catch((error) => {
          setIsLoading(false)
          toast.error(error.message)
        });
  

  }

  return (
    <>
      {isLoading && <Loader/>}
      <section className={`container ${styles.auth}`}>
        <Card>
          <div className={styles.form}>
            <h2>Register</h2>

            <form onSubmit={handelOnSubmit}>
              <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              <input type="password" placeholder="Confirm Password" value={cPassword} onChange={(e) => setCPassword(e.target.value)} required />
              <button ty className="--btn --btn-primary --btn-block">
                Register
              </button>
            </form>

            <span className={styles.register}>
              <p>Already an account?</p>
              <Link to="/login">Login</Link>
            </span>
          </div>
        </Card>
        <div className={styles.img}>
          <img src={registerImg} alt="Register" width="400" />
        </div>
      </section>
    </>
  );
};

export default Register;