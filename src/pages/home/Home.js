import React, { useEffect } from 'react'
import Slider from '../../components/Slider/Slider'
import Product from '../../components/product/product'

const Home = () => {

  const url = window.location.href
  const scrollToProducts = () => {
    if(url.includes("#products")){
      window.scrollTo({
        top: 700,
        behavior: "smooth",
      });
      return
    }
  }

  useEffect(() => {
    scrollToProducts()
  }, [])

  return (
   <>
   <Slider/>
   <Product/>
   </>
     
    
  )
}

export default Home
