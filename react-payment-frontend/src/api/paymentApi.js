import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

// Centralized error handling
const handleError = (error) => {
  console.error('API Error:', error.response || error.message);
  const message = error.response?.data?.message || 'An error occurred. Please try again.';
  throw new Error(message);
};

export const createOrder = async (amount) => {
  try {
    const response = await API.post('/order', { amount });
    console.log("createOrder api response : ", response.data);
    return response.data;
  } 
  catch (error) {
    console.log("createOrder api error : ", error);
    handleError(error);
  }
};

export const verifyPayment = async (paymentData) => {
  try {
    const response = await API.post('/verify', paymentData);
    console.log("verifyPayment api response : ", response.data);
    return response.data;
  } 
  catch (error) {
    console.log("verifyPayment api error : ", error);
    handleError(error);
  }
};

// export const fetchPaymentHistory = async () => {
//   try {
//     const response = await API.get('/history');
//     return response.data;
//   } catch (error) {
//     handleError(error);
//   }
// };

// export const fetchPaymentDetails = async (paymentId) => {
//   try {
//     const response = await API.get(`/${paymentId}`);
//     return response.data;
//   } catch (error) {
//     handleError(error);
//   }
// };
