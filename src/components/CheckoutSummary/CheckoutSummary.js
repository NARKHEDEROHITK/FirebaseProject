import React from 'react'
import { useSelector } from 'react-redux';
import { CheckoutFunctions } from '../../Helper/Helper';
import { Link } from 'react-router-dom';
import Card from '../card/Card';
import styles from './CheckoutSummary.module.scss';

const CheckoutSummary = () => {

    const { cartItems } = useSelector(state => state.cart)

    return (
        <div>
            <h3>Checkout Summary</h3>
            <div>
                {cartItems.lenght === 0 ? (
                    <>
                        <p>No item in your cart.</p>
                        <button className="--btn">
                            <Link to="/#products">Back To Shop</Link>
                        </button>
                    </>
                ) : (
                    <div>
                        <p>
                            <b>{`Cart item(s): ${cartItems?.length}`}</b>
                        </p>
                        <div className={styles.text}>
                            <h4>Subtotal:</h4>
                            <h3>{CheckoutFunctions.CALCULATE_TOTAL_CARTITEMS(cartItems)}</h3>
                        </div>
                        {cartItems.map((item, index) => {
                            const { id, name, price, quantity, imageURL, imageName } = item;
                            return (
                                <Card key={id} cardClass={styles.card} >
                                   <div style={{ display: 'flex' }}>
                                   <div style={{ width: '150px' , paddingRight:'20px' }}>
                                        <img src={imageURL} alt={imageName} width={"100%"} />
                                    </div>
                                    <div>
                                        <h4>Product: {name}</h4>
                                        <p>Quantity: {quantity}</p>
                                        <p>Unit price: {price}</p>
                                        <p>Set price: {price * quantity}</p>
                                    </div>
                                   </div>

                                </Card>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

export default CheckoutSummary
