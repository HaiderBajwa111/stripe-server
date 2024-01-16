// app.js

// Import the Express module
const express = require('express');
const stripe = require('stripe')('sk_test_51NPWRHJXpxuUxxe0pmxneFwEgmEhvksOvopAsK6OeAlhoPb9l5jTTQKW82OI8qMQXYoznCv1gTMS7YQTwPwwm6UE007Qmpwfxj');
const bodyParser = require('body-parser');
var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");



// Create an Express application
const app = express();

app.use(bodyParser.json());



admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
// Define a route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.post('/create-payment-intent', async (req, res) => {
    const { amount } = req.body;
  
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'usd', // Change this to your preferred currency
      });
  
      res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
// Set up the server to listen on port 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
