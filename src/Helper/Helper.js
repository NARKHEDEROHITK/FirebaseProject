export const CheckoutFunctions = {
    CALCULATE_TOTAL_CARTITEMS(cartItems){
       return cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0).toFixed(2)
    }
}