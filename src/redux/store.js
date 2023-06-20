import { combineReducers, configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./slices/AuthSlice";
import ProductsReducer from "./slices/ProductsSlice";
import PaginationReducer from "./slices/PaginationSlice"
import CartReducer from "./slices/CartSlice";
import CheckoutReducer from "./slices/CheckoutSlice";
import OrderHistoryReducer from "./slices/OrderHistorySlice";

const rootreducers = combineReducers({
    auth: AuthReducer,
    products:ProductsReducer,
    pagination:PaginationReducer,
    cart:CartReducer,
    checkout:CheckoutReducer,
    orderhistory:OrderHistoryReducer
})
const store = configureStore({
    reducer: rootreducers,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export default store