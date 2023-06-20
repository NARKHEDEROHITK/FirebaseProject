import React, { useEffect, useState } from 'react'
import { db, storage } from '../../../firebase/config';
import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import styles from './ViewProducts.module.scss';
import { Link } from 'react-router-dom';
import Loader from '../../loader/Loader';
import Notiflix from 'notiflix';
import { deleteObject, ref } from 'firebase/storage';
import { useDispatch, useSelector } from 'react-redux';
import { STORE_PRODUCTS } from '../../../redux/slices/ProductsSlice';
import UseFetchCollection from '../../../customHooks/useFetchCollection';

const ViewProducts = () => {
  const dispatch = useDispatch()
  const {data , isLoading} = UseFetchCollection("products")
  const {products} =  useSelector(state=>state.products)
  
  useEffect(() => {
    dispatch(STORE_PRODUCTS(data))
  }, [data])
 
  const deleteProduct = async (id, imageURL) => {
    try {
      // delete from firestore 
      await deleteDoc(doc(db, "products", id));
      //delete image from storage 
      const desertRef = ref(storage, imageURL);
      await deleteObject(desertRef)
      toast.success("product is deleted succesfully")
    } catch (error) {
      toast.error(error.message)
    }
  }

  const onConfirmDelete = (id, imageURL) => {
    console.log(id, imageURL)
    Notiflix.Confirm.show(
      'Product Delete !!!',
      'are you confirm to delete product',
      'Delete',
      'Cancel',
      function okCb() {
        deleteProduct(id, imageURL)
      },
      function cancelCb() {
        console.log('product not deleted');
      },
      {
        width: '320px',
        borderRadius: '3px',
        titleColor: 'orangered',
        cancelButtonBackground: "green",
        okButtonBackground: "orangered",
        cancelButtonColor: "white",
        okButtonColor: "white"

      },
    );
  }

  return (
    <>
      {isLoading && <Loader />}
      {
        (products.length !== 0) ?
          <div className={styles.table}>
            <h2>All Products</h2>
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => {
                  const { name, category, price, imageURL, image, id } = product
                  return <tr key={id}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={imageURL}
                        alt={image}
                        style={{ width: "100px" }}
                      />
                    </td>
                    <td>{name}</td>
                    <td>{category}</td>
                    <td>{price}</td>
                    <td className={styles.icons}>
                      <Link to={`/admin/add-product/${id}`}>
                        <FaEdit size={20} color="green" />
                      </Link>
                      &nbsp;
                      <FaTrashAlt
                        size={18}
                        color="red"
                        onClick={() => onConfirmDelete(id, imageURL)}
                      />
                    </td>
                  </tr>
                }
                )}
              </tbody>
            </table>
          </div> : <h1>Product Not Available</h1>
      }
    </>
  );
}

export default ViewProducts
