
require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY)
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send("WELCOME TO NODE")

})

let array = [];
const calculateOrderAmount = (items) => {
    items.map((item) => {
        const { price, quantity } = item;
        const cartItemAmount = price * quantity;
        return array.push(cartItemAmount);
    });
    const totalAmount = array.reduce((a, b) => {
        return a + b;
    }, 0);

    return totalAmount * 100;
};

app.post("/create-payment-intent", async (req, res) => {
    const { items, shipping, description } = req.body;

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(items),
        currency: "inr",
        automatic_payment_methods: {
            enabled: true,
        },
        description,
        shipping: {
            address: {
                line1: shipping.line1,
                line2: shipping.line2,
                city: shipping.city,
                country: shipping.country,
                postal_code: shipping.postal_code,
            },
            name: shipping.name,
            phone: shipping.phone,
        },
    });

    res.send({
        clientSecret: paymentIntent.client_secret,
    });
});




const PORT = process.env.PORT || 4242

app.listen(PORT, () => console.log('server is running on ', PORT))