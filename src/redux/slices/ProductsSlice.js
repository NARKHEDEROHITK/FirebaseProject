import { createSlice } from '@reduxjs/toolkit'
import { SET_CURRENTPAGE } from './PaginationSlice'


const initialState = {
  products: [],
  filterProduct: [],
  filterObject: {
    search: "",
    category: "All",
    brand: "All",
    sort: "latest",
    price: Infinity,
    maxPrice:Infinity,
    minPrice:0
  }
}

const SortFiltering = (sortValue, filterProducts) => {
  switch (sortValue) {
    case 'latest':
      return filterProducts
    case 'lowest-price':
      return filterProducts.sort((a,b)=>a.price - b.price)
    case 'highest-price':
      return filterProducts.sort((a,b)=>b.price - a.price)
    case 'a-z':
      return filterProducts.sort((a,b)=>a.name.localeCompare(b.name))
    case 'z-a':
      return filterProducts.sort((a,b)=>b.name.localeCompare(a.name))
    default:
      return filterProducts
  }
}

const ProductsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    STORE_PRODUCTS(state, action) {
      state.products = action.payload
      state.filterProduct = action.payload
    },
    SET_FILTER_OBJECT(state, action) {

      state.filterObject = {...action.payload}
      console.log(action.payload) 
      const { search, category, brand, sort, price } = state.filterObject
      //search keyword
      state.filterProduct = state.products
        .filter((prod) => prod.name.includes(search) || prod.category.includes(search))
      //sort products
      state.filterProduct = [...SortFiltering(sort ,state.filterProduct)]
      //brand change
      state.filterProduct = [...state.filterProduct.filter((prod)=>brand !== 'All' ? prod.brand === brand:prod)]
      //category change
      state.filterProduct = [...state.filterProduct.filter((prod)=>category !== 'All' ? prod.category === category:prod)]
      //price change
      state.filterProduct = [...state.filterProduct.filter((prod)=>prod.price <= price)]

    }
  }

});

export const { STORE_PRODUCTS, SET_FILTER_OBJECT } = ProductsSlice.actions

export default ProductsSlice.reducer