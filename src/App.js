import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.scss";
import { Home, Contact, Cart, Login, Register, Reset, Admin } from './pages'
import { Footer, Header, } from './components'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminRouteOnly from "./components/AdminRouteOnly/AdminRouteOnly";
import ProductDetail from "./components/product/ProductDetail/ProductDetail";
import CheckoutDetails from "./pages/checkout/CheckoutDetails";
import LoginRouteOnly from "./components/LoginRouteOnly/LoginRouteOnly";
import Checkout from "./pages/checkout/Checkout";
import CheckoutSuccess from "./pages/checkout/CheckoutSuccess";
import OrderHistory from "./pages/orderHistory/OrderHistory";

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={
            <LoginRouteOnly>
              <Cart />
            </LoginRouteOnly>} />
          <Route path="/order-history" element={
            <LoginRouteOnly>
              <OrderHistory />
            </LoginRouteOnly>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/product-details/:id" element={<ProductDetail />} />
          <Route path="/checkout-details" element={
            <LoginRouteOnly>
              <CheckoutDetails />
            </LoginRouteOnly>
          } />
          <Route path="/checkout" element={
            <LoginRouteOnly>
              <Checkout />
            </LoginRouteOnly>
          } />
          <Route path="/checkout-success" element={
            <LoginRouteOnly>
              <CheckoutSuccess />
            </LoginRouteOnly>
          } />
          <Route path="/admin/*" element={
            <AdminRouteOnly>
              <Admin />
            </AdminRouteOnly>
          } />

        </Routes>
        <Footer />
      </BrowserRouter >
    </>
  );
}

export default App;
