import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
    orderItems: []
}

export const getOrderHistory = createAsyncThunk('getOrderHistory', async (_, thunkAPI) => {
    
})

const OrderHistorySlice = createSlice({
    name: 'orderhistory',
    initialState,
    reducers: {

    }
});

export const { } = OrderHistorySlice.actions

export default OrderHistorySlice.reducer