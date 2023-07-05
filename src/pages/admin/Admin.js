import React from 'react'
import styles from './Admin.module.scss';
import Navbar from '../../components/Admin/navbar/Navbar';
import { Route, Routes } from 'react-router-dom';
import ViewProducts from '../../components/Admin/viewProducts/ViewProducts';
import AddProduct from '../../components/Admin/addProducts/AddProduct';
import Home from '../../components/Admin/home/Home';
import Orders from '../../components/Admin/orders/Orders';
import ChangeOrderStatus from '../../components/Admin/changeOrderStatus/ChangeOrderStatus';

const Admin = () => {
  return (
    <div className={styles.admin}>
      <div className={styles.navbar}>
        <Navbar />
      </div>
      <div className={styles.content}>
        <Routes>
          <Route path='home' element={<Home/>} />
          <Route path='all-products' element={<ViewProducts/>} />
          <Route path='add-product/:id' element={<AddProduct/>} />
          <Route path='orders' element={<Orders/>} />
          <Route path='changes-order-status/:id' element={<ChangeOrderStatus/>} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin
