import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';
import { addDoc, collection, getDocs, query, setDoc, where, doc, getDoc } from 'firebase/firestore'
import { db } from '../../firebase/config'
import Notiflix from 'notiflix';

const initialState = {
    cartItems: [],
    cartTotalAmount: 0,
    cartQuantity: 0,
    authId: null,
    cartId:null
}

export const addToCart = createAsyncThunk('addToCart', async (data, thunkAPI) => {

    let { cart } = thunkAPI.getState()
    try {
        console.log(data)
        console.log("cart" , cart)
        const { id } = data
        const index = cart.cartItems.findIndex(item => item.id === id);
        if (index >= 0) {
            // product increase functinality
            let cartProducts = [...cart.cartItems]
            cartProducts[index] = Object.assign({}, cartProducts[index], { quantity: cartProducts[index].quantity + 1 });
            const docRef = doc(db, 'cart', cart.cartId);
            await setDoc(docRef, { cartItems: cartProducts }, { merge: true })
            toast.success("Product count increase by 1")
        } else {
            // add to cart functionality
            const docRef = doc(db, 'cart', cart.cartId);
            let cartProducts = [...cart.cartItems]
            cartProducts.push({ ...data, quantity: 1 })
            await setDoc(docRef, { cartItems: cartProducts }, { merge: true })
            toast.success("Product added successfully")
        }
        thunkAPI.dispatch(getCart())

    } catch (error) {
        console.error("41 , Error updating document: ", error);
        thunkAPI.rejectWithValue(error)
    }
})

export const createCart = createAsyncThunk('createCart', async (data, thunkAPI) => {
    try {
        await addDoc(collection(db, "cart"), {
            cartItems: [],
            cartTotalAmount: 0,
            cartQuantity: 0,
            authId: data.uid,
            email: data.email
        });
        toast.success("Cart created successfully from async thunk")
    } catch (error) {
        toast.error(error.message)
    }
})

export const getCart = createAsyncThunk('getCart', async (data, thunkAPI) => {
    try {
        const { auth } = thunkAPI.getState()
        console.log("auth", auth)
        const q = query(collection(db, 'cart'), where("authId", "==", auth.userId));
        const querySnapshot = await getDocs(q)
        return querySnapshot
    } catch (error) {
        toast.error(error.message)
    }
})

export const decreaseQuantityCart = createAsyncThunk("decreaseQuantityCart", async (data, thunkAPI) => {
    try {
        const { cartItems, cartId } = thunkAPI.getState().cart
        const { id, quantity } = data
        const index = cartItems.findIndex(item => item.id === id);
        if (index >= 0 && quantity > 1) {
            let cartProducts = [...cartItems]
            cartProducts[index] = Object.assign({}, cartProducts[index], { quantity: cartProducts[index].quantity - 1 });
            const docRef = doc(db, 'cart', cartId);
            await setDoc(docRef, { cartItems: cartProducts }, { merge: true })
            thunkAPI.dispatch(getCart())
            toast.success("Product count decrease by 1")
        }else if (index >= 0 && quantity === 1) {
            Notiflix.Confirm.show(
                'Are You Want to Delete Product?',
                'Are you sure?',
                'Delete',
                'Cancel',
                () => {
                    thunkAPI.dispatch(deleteProductCart(data))
                },
                () => {
                    toast.success("Your Product is safe")
                },
                {
                    titleColor:'red',
                    backgroundColor:'lightblue',
                    cancelButtonBackground:'green',
                    okButtonBackground:'red',
                    okButtonColor:'white',
                    cancelButtonColor:'white',
                    messageColor:'red'
                }
            );
        }

    } catch (error) {
        console.log(error.message)
        thunkAPI.rejectWithValue(error)
    }
})

export const deleteProductCart = createAsyncThunk("deleteProductCart", async (data, thunkAPI) => {
    try {
        const { cartItems, cartId } = thunkAPI.getState().cart
        const { id } = data
        const index = cartItems.findIndex(item => item.id === id);
        if (index >= 0) {
            let cartProducts = cartItems.filter(item => item.id !== id)
            const docRef = doc(db, 'cart', cartId);
            await setDoc(docRef, { cartItems: cartProducts }, { merge: true })
            thunkAPI.dispatch(getCart())
            toast.success("Product id deleted")
        } else {
            toast.success("Product Not found ")
        }

    } catch (error) {
        console.log(error.message)
        thunkAPI.rejectWithValue(error)
    }
})

export const clearCart = createAsyncThunk("clearCart", async (_, thunkAPI) => {
    try {
        const { cartId } = thunkAPI.getState().cart
        const docRef = doc(db, 'cart', cartId);
        await setDoc(docRef, { cartItems: [] }, { merge: true })
        thunkAPI.dispatch(getCart())
        toast.success("Your Cart is Empty from asyncthunk")
    } catch (error) {
        console.log(error.message)
        thunkAPI.rejectWithValue(error)
    }
})

const CartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {},
    extraReducers: (builder) =>
        builder.
            addCase(addToCart.fulfilled, (state, action) => {
                if (action.payload) {
                    toast.success("add success")
                }

            }).
            addCase(addToCart.rejected, (state, action) => {
                toast.error("Error in add cart")
            }).
            addCase(getCart.fulfilled, (state, action) => {
                let abc;
                action.payload.forEach((docc) => {
                    abc = { ...docc.data(), cartId: docc.id }
                });
                return { ...abc }
            }).
            addCase(getCart.rejected, (state, action) => {
                toast.error(action.payload)
            }).
            addCase(createCart.fulfilled, (state, action) => {

                toast.success("cart created successfully ")
            }).
            addCase(createCart.rejected, (state, action) => {
                toast.error("cart not created")
            }).
            addCase(decreaseQuantityCart.fulfilled, (state, action) => {
                // toast.success("quantity decrease y 1")
            }).
            addCase(decreaseQuantityCart.rejected, (state, action) => {
                // toast.error(action.payload)
            }).
            addCase(clearCart.fulfilled, (state, action) => {
                toast.success("Your cart is cleared from extraReducer")
            }).
            addCase(clearCart.rejected, (state, action) => {
                toast.error(action.payload)
            })

});

export const { } = CartSlice.actions

export default CartSlice.reducer