const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  razorpayOrderId: { type: String, required: true },
  razorpayPaymentId: { type: String },
  amount: { type: Number, required: true },
  status: { type: String, default: 'pending' },
}, { timestamps: true });

module.exports = mongoose.model('Payment', paymentSchema);
