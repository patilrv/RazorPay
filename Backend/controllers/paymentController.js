const Razorpay = require('razorpay');
const Payment = require('../models/paymentModel');
require('dotenv').config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});
// console.log("razorpay: ", razorpay);

// Create an order
const createOrder = async (req, res) => {
  const { amount } = req.body;
  try {
    const options = {
      amount: amount * 100, // Amount in paise
      currency: 'INR',
    };
    // console.log("options : ", options);
    const order = await razorpay.orders.create(options);
    console.log("order : ", order);
    const payment = new Payment({
      razorpayOrderId: order.id,
      amount,
    });
    let result = await payment.save();


    res.status(200).json({ success: true, res : result, order });
  } catch (error) {
    console.log("createOrder error : ", error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Verify payment
const verifyPayment = async (req, res) => {
  const { razorpayOrderId, razorpayPaymentId } = req.body;
  try {
    const payment = await Payment.findOne({ razorpayOrderId });
    if (!payment) throw new Error('Order not found');

    payment.razorpayPaymentId = razorpayPaymentId;
    payment.status = 'successful';
    await payment.save();

    res.status(200).json({ success: true, payment });
  } 
  catch (error) {
    console.log("verifyPayment error : ", error);
    res.status(400).json({ success: false, error: error.message });
  }
};

module.exports = { createOrder, verifyPayment };
