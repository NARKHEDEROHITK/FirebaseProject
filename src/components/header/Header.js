import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";
import { FaShoppingCart, FaTimes, FaUser } from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { auth } from "../../firebase/config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from "../loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { REMOVE_ACTIVE_USER, SET_ACTIVE_USER } from "../../redux/slices/AuthSlice";
import ShowOnLogin, { ShowOnLogout } from "../HiddenLink/HiddenLink";
import { AdminRouteLink } from "../AdminRouteOnly/AdminRouteOnly";
import { getCart } from "../../redux/slices/CartSlice";


const logo = (
  <div className={styles.logo}>
    <Link to="/">
      <h2>
        e<span>Shop</span>.
      </h2>
    </Link>
  </div>
);



const activeLink = ({ isActive }) => isActive ? `${styles.active}` : ""

const Header = () => {

  const { cartItems } = useSelector(state => state.cart)
  const cart = (
    <span className={styles.cart}>
      <Link to="/cart">
        Cart
        <FaShoppingCart size={20} />
        <p>{cartItems?.length || 0}</p>
      </Link>
    </span>
  );
  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [displayName, setDisplayName] = useState("");

  const dispatch = useDispatch()

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        let obj = {
          email: user.email,
          userName: user.displayName || user.email.substring(0, user.email.indexOf('@')),
          userId: user.uid
        }
        dispatch(SET_ACTIVE_USER(obj))
        setDisplayName(user.displayName || user.email.substring(0, user.email.indexOf('@')))
        dispatch(getCart())
      } else {
        setDisplayName("")
        dispatch(REMOVE_ACTIVE_USER())
      }
    });
  }, [dispatch])

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const hideMenu = () => {
    setShowMenu(false);
  };

  const handelOnLogout = () => {
    setIsLoading(true)
    signOut(auth).then(() => {
      setIsLoading(false)
      toast.success("Logout succefully")

      navigate('/login')
    }).catch((error) => {
      setIsLoading(false)
      toast.error(error.message)
    });
  }

  return (
    <>
      {isLoading && <Loader />}
      <header style={{ position: 'sticky', top: '0', zIndex: '99' }}>
        <div className={styles.header}>
          {logo}

          <nav
            className={
              showMenu ? `${styles["show-nav"]}` : `${styles["hide-nav"]}`
            }
          >
            <div
              className={
                showMenu
                  ? `${styles["nav-wrapper"]} ${styles["show-nav-wrapper"]}`
                  : `${styles["nav-wrapper"]}`
              }
              onClick={hideMenu}
            ></div>

            <ul onClick={hideMenu}>
              <li className={styles["logo-mobile"]}>
                {logo}
                <FaTimes size={22} color="#fff" onClick={hideMenu} />
              </li>
              <AdminRouteLink>
                <li>
                  <Link to={'/admin/home'}>
                    <button className="--btn-primary --btn" >Admin</button>
                  </Link>
                </li>
              </AdminRouteLink>
              <li>
                <NavLink className={activeLink} to="/">Home</NavLink>
              </li>
              <li>
                <NavLink className={activeLink} to="/contact">Contact Us</NavLink>
              </li>
            </ul>
            <div className={styles["header-right"]} onClick={hideMenu}>
              <span className={styles.links}>
                <ShowOnLogin>
                  <a href="#home">
                    {displayName && <span><FaUser size={16} />  {displayName}</span>}
                  </a>
                </ShowOnLogin>
                <ShowOnLogout>
                  <NavLink className={activeLink} to="/login">Login</NavLink>
                </ShowOnLogout>
                <ShowOnLogin>
                  <NavLink className={activeLink} to="/order-history">My Orders</NavLink>
                  <Link onClick={handelOnLogout} >Logout</Link>
                </ShowOnLogin>
              </span>
              <ShowOnLogin>
                {cart}
              </ShowOnLogin>

            </div>
          </nav>

          <div className={styles["menu-icon"]}>
            <ShowOnLogin>
              {cart}
            </ShowOnLogin>
            <HiOutlineMenuAlt3 size={28} onClick={toggleMenu} />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;