import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isLoggedIn:false,
    userName:null,
    userId:null,
    email:null
}

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_ACTIVE_USER(state,action){
        const { email, userName, userId } = action.payload;
        state.isLoggedIn = true;
        state.email = email;
        state.userName = userName;
        state.userId = userId;
    },
    REMOVE_ACTIVE_USER(state){
        state.isLoggedIn = false;
        state.email = null;
        state.userName = null;
        state.userId = null;
        console.log(state.isLoggedIn)
    }
  }
});

export const {SET_ACTIVE_USER , REMOVE_ACTIVE_USER} = AuthSlice.actions

export default AuthSlice.reducer