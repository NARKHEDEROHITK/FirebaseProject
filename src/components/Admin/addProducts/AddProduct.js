import React, { useRef, useState } from 'react'
import Card from '../../card/Card'
import styles from './AddProduct.module.scss';
import { db, storage } from '../../../firebase/config'
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { collection, addDoc, Timestamp, setDoc, doc } from "firebase/firestore";
import { toast } from 'react-toastify';
import Loader from '../../loader/Loader'
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

const categories = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Electronics" },
  { id: 3, name: "Fashion" },
  { id: 4, name: "Phone" },
];

const initialState = {
  name: '',
  image: '',
  imageURL: '',
  price: 0,
  category: '',
  brand: '',
  desc: ''
}
const AddProduct = () => {
  const navigate = useNavigate()
  const { products } = useSelector(state => state.products)
  const { id } = useParams()
  const editedProduct = products.find((item) => item.id === id)
  const fileRef = useRef(null)
  const [product, setProduct] = useState(() => {
    return detectProduct(id, { ...initialState }, { ...editedProduct })
  })
  const [progress, setProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(false)



  const handelOnInputChange = (e) => {
    const { name, value } = e.target
    setProduct(product => ({ ...product, [name]: value }))
  }

  const handelOnImageChange = (e) => {
    try {
      setIsLoading(true)
      const file = e.target.files[0]
      const name = file.name
      setProduct(prev => ({ ...prev, image: name }))
      const storageRef = ref(storage, `eshop/${Date.now()}${name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on('state_changed',
        (snapshot) => {
          const progressValue = parseInt((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setProgress(progressValue)
        },
        (error) => {
          setIsLoading(false)
          toast.error(error.message)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setIsLoading(false)
            setProduct(prev => ({ ...prev, imageURL: downloadURL }))
            toast.success("File uploaded succeefully")
            
          });
        }
      );
    } catch (error) {
      toast.error(error.message)
    }

  }

  const handelAddProduct = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await addDoc(collection(db, "products"), {
        ...product,
        createdAt: Timestamp.now().toDate(),
        price: Number(product.price)
      });
      toast.success("Product Added Succefully")
      setProduct({ ...initialState })
      setProgress(0)
      fileRef.current.value = null
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      toast.error(error.message)
    }

  }

  const handelEditProduct = async (e) => {
    e.preventDefault()
    if(product.imageURL !== editedProduct.imageURL){
     try {
      const desertRef = ref(storage, editedProduct.imageURL);
      await deleteObject(desertRef)
     } catch (error) {
        toast.error(error.message)
     }
    }

    try {
      await setDoc(doc(db, "products", id), {
        ...product,
        createdAt:editedProduct.createdAt.toDate(),
        editedAt: Timestamp.now().toDate()
      });
      navigate('/admin/all-products')
      toast.success("Product edited succefully")
    } catch (error) {
      toast.error(error.message)
    }
  }

  function detectProduct(id, f1, f2) {
    if (id !== editedProduct?.id) {
      return f1
    }
    return f2
  }

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.product}>
        <h1>{detectProduct(id, "Add New Product", "Edit Product")} </h1>
        <Card cardClass={styles.card}>
          <form onSubmit={detectProduct(id, handelAddProduct, handelEditProduct)}>
            <label>Product name:</label>
            <input
              type="text"
              placeholder="Product name"
              required
              name="name"
              value={product.name}
              onChange={handelOnInputChange}
            />

            <label>Product image:</label>
            <Card cardClass={styles.group}>
              {progress > 0 && <div className={styles.progress}>
                <div
                  className={styles["progress-bar"]}
                  style={{ width: `${progress}%` }}
                >
                  {progress < 100 ? `uploading ${progress}%` : `uploaded ${progress}%`}
                </div>
              </div>}
              <input
                type="file"
                accept="image/*"
                placeholder="Product Image"
                name="image"
                onChange={handelOnImageChange}
                ref={fileRef}
                required={detectProduct(id , true , false)}
              />
              {product.imageURL && <input
                type="text"
                placeholder="Image URL"
                name="imageURL"
                disabled
                value={product.imageURL}
              />}
            </Card>

            <label>Product price:</label>
            <input
              type="number"
              placeholder="Product price"
              required
              name="price"
              value={product.price}
              onChange={handelOnInputChange}
            />
            <label>Product Category:</label>
            <select required name="category" value={product.category}
              onChange={handelOnInputChange}>
              <option value="" disabled >
                ----chose product---
              </option>
              {
                categories?.map(cat =>
                  <option key={cat.id} value={cat.name} >
                    {cat.name}
                  </option>
                )
              }
            </select>

            <label>Product Company/Brand:</label>
            <input
              type="text"
              placeholder="Product brand"
              required
              name="brand"
              value={product.brand}
              onChange={handelOnInputChange}
            />

            <label>Product Description</label>
            <textarea
              name="desc"
              required
              cols="30"
              rows="10"
              value={product.desc}
              onChange={handelOnInputChange}
            ></textarea>

            <button className="--btn --btn-primary">{detectProduct(id, "Save Product", "Update Product")}</button>
          </form>
        </Card>
      </div>
    </>
  )
}

export default AddProduct
