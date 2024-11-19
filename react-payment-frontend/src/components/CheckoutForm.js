import React, { useState } from 'react';
import { createOrder, verifyPayment } from '../api/paymentApi';

export default function CheckoutForm() {
    const [amount, setAmount] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleClick = async () => {
        setError('')

        if (!window.Razorpay) {
            setError('Razorpay SDK not loaded. Please try again.');
            return;
        }

        if (!amount || isNaN(amount) || Number(amount) <= 0) {
            setError('Please enter valid amount greater than 0')
            return;
        }

        setLoading(true)
        try {
            const { order } = await createOrder(amount)

            const options = {
                key: process.env.REACT_APP_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: order.currency,
                order_id: order.id,
                handler: async (response) => {
                    try {
                        const paymentData = {
                            razorpayOrderId: response.razorpay_order_id,
                            razorpayPaymentId: response.razorpay_payment_id
                        }

                        const result = await verifyPayment(paymentData);

                        if (result.success) {
                            alert('Payment successful!');
                        } else {
                            alert('Payment failed!');
                        }
                    }
                    catch (error) {
                        setError(error.message);
                    }
                },
                prefill: {
                    name: 'John Doe',
                    email: 'john.doe@example.com',
                    contact: '9876543210'
                },
                theme: { color: '#3399cc' }
            }
            const rzp = new window.Razorpay(options);
            rzp.open();
        }
        catch (paymentError) {
            setError(paymentError.message);
        }
        finally {
            setLoading(false);
        }

    };
    return (
        <div className='checkout-form'>
            <h2>Coustom Checkout</h2>

            {error && <p className='error-message'>{error}</p>}

            <input type='number' value={amount} onChange={(evt) => { setAmount(evt.target.value) }} placeholder='Enter amount' style={{'textAlign' : "center", 'margin' : '10px -10px'}}></input>
            <button onClick={handleClick} >{loading ? 'Proccessing...' : 'Pay Now'}</button>
        </div>
    )
}
