const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db");
require("dotenv").config();
const authRoutes = require("./Routes/authRoutes");
const PDF = require("./Models/pdfModel");
const stripe = require('stripe')('sk_test_51O4ObVSJTQs86EUIKfo6AOPvNryHDPHg40Ov0hS51nbLbaqwNC02Vx6ZlPcACUpY11uGvdlkfPUQqb2HAgTK78MT00ikurTQ9e');

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/user/register", authRoutes);
app.use("/user/login", authRoutes);

app.get("/get-pdf", async (req, res) => {
  try {
    const Pdf = await PDF.find({});
    res.json(Pdf);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get('/get-pdf/:id', async (req, res) => {
  try {
    const pdfId = req.params.id;
    const pdf = await PDF.findById(pdfId);

    if (!pdf) {
      return res.status(404).json({ error: 'PDF not found' });
    }

    res.json(pdf);
  } catch (error) {
    console.error('Error fetching PDF details:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.post('/create-payment-intent', async (req, res) => {
  try {
    console.log(req.body)
    const { amount, currency, description, customerName, customerAddress } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      description,
      shipping: {
        name: customerName, // Include customer name
        address: {
          line1: customerAddress, // Include customer address
        },
      },
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Handle payment confirmation
app.post('/confirm-payment', async (req, res) => {
  try {
    const { paymentMethodId, paymentIntentId } = req.body;

    const paymentIntent = await stripe.paymentIntents.confirm(paymentIntentId, {
      payment_method: paymentMethodId,
    });

    if (paymentIntent.status === 'succeeded') {
      // Update the 'isLocked' field in your database model
      // Replace 'YourModel' with your actual model and 'ObjectId' with the ID of the object you want to update
      await PDF.updateOne({ _id: ObjectId }, { isLocked: false });

      // Respond with a success message or any other response as needed
      res.json({ status: 'Payment succeeded and isLocked is updated' });
    } else {
      res.json({ status: 'Payment not successful' });
    }
  } catch (error) {
    console.error('Error confirming payment:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log("\x1b[44m\x1b[33m%s\x1b[0m", `Server is running on port ${PORT}`);
});
