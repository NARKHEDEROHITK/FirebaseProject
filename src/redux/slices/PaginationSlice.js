import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentPage:1,
    productPerPage:6,
    totalProducts:null,
    totalPages:null
}

const PaginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    SET_PAGINATION(state,action){
        state.totalPages = action.payload.totalPages
        state.totalProducts = action.payload.totalProducts
    },
    SET_CURRENTPAGE(state,action){
        state.currentPage = action.payload.currentPage
    }
  }
});

export const {SET_PAGINATION , SET_CURRENTPAGE} = PaginationSlice.actions

export default PaginationSlice.reducer