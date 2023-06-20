import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    totalPrice:0,
    shippingAddress:'',
    checkoutProducts:[]
}

const CheckoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    SAVE_PRICE_TOTAL(state,action){
        state.totalPrice = action.payload
    },
    SAVE_SHIPPING_ADDRESS(state,action){
        state.shippingAddress = action.payload
    },
    CHECKOUT_PRODUCTS(state,action){
        state.checkoutProducts = [...action.payload]
    }
  }
});

export const {SAVE_PRICE_TOTAL , SAVE_SHIPPING_ADDRESS ,CHECKOUT_PRODUCTS} = CheckoutSlice.actions

export default CheckoutSlice.reducer