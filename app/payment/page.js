'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { addOrderDetails } from '@/lib/firestore/user/write';

const PaymentPage = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State to hold user ID and form data
  const [userId, setUserId] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    addressLine1: '',
    addressLine2: '',
    addressLine3: '',
    mobile: '',
    pincode: '',
    state: '',
    amount: ''
  });

  // Extract UID and totalAmount from the URL
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const uid = urlParams.get('uid');
      const totalAmount = urlParams.get('totalAmount');

      setUserId(uid);
      setFormData(prevData => ({
        ...prevData,
        amount: totalAmount || '' // Set amount from URL if available
      }));
    }
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent double clicks

    // Set submitting state to true
    setIsSubmitting(true);
    const { fullName, addressLine1, addressLine2, addressLine3, mobile, pincode, state, amount } = formData;

    const data = {
      fullName,
      addressLine1,
      addressLine2,
      addressLine3,
      mobile,
      pincode,
      state,
      amount,
      userId,
      MUID: 'MUIDW' + Date.now(),
      transactionId: 'T' + Date.now()
    };
    console.log('Transaction ID:', data.transactionId);

    try {
      // Add order details to Firestore
      const orderId = await addOrderDetails(data); // Save to Firestore

      // After saving, proceed with payment request
      const response = await axios.post('/api/order', data);
      if (response.data && response.data.data.instrumentResponse.redirectInfo.url) {
        window.location.href = response.data.data.instrumentResponse.redirectInfo.url;
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false); // Reset button state after request completes
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center p-4 md:p-0"
      style={{ backgroundImage: "url('/payment.jpg')" }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div> 
      <form
        onSubmit={handleSubmit}
        className="relative bg-white bg-opacity-70 backdrop-blur-md shadow-lg rounded-lg p-8 w-full max-w-3xl space-y-6 md:space-y-0 md:grid md:grid-cols-2 md:gap-6 mx-4 md:mx-0"
      >
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6 col-span-2">Payment Form</h2>
        
        {userId && (
          <p className="mb-4 text-gray-700 col-span-2">
            <strong>User ID:</strong> {userId}
          </p>
        )}

        <div className="mb-4 md:mb-0">
          <label htmlFor="fullName" className="block text-sm font-medium mb-1 text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <div className="mb-4 md:mb-0">
          <label htmlFor="addressLine1" className="block text-sm font-medium mb-1 text-gray-700">
            Address Line 1
          </label>
          <input
            type="text"
            id="addressLine1"
            name="addressLine1"
            value={formData.addressLine1}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <div className="mb-4 md:mb-0">
          <label htmlFor="addressLine2" className="block text-sm font-medium mb-1 text-gray-700">
            Address Line 2
          </label>
          <input
            type="text"
            id="addressLine2"
            name="addressLine2"
            value={formData.addressLine2}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <div className="mb-4 md:mb-0">
          <label htmlFor="addressLine3" className="block text-sm font-medium mb-1 text-gray-700">
            Address Line 3 (Optional)
          </label>
          <input
            type="text"
            id="addressLine3"
            name="addressLine3"
            value={formData.addressLine3}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <div className="mb-4 md:mb-0">
          <label htmlFor="mobile" className="block text-sm font-medium mb-1 text-gray-700">
            Mobile Number
          </label>
          <input
            type="tel"
            id="mobile"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <div className="mb-4 md:mb-0">
          <label htmlFor="pincode" className="block text-sm font-medium mb-1 text-gray-700">
            Pincode
          </label>
          <input
            type="text"
            id="pincode"
            name="pincode"
            value={formData.pincode}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <div className="mb-4 md:mb-0">
          <label htmlFor="state" className="block text-sm font-medium mb-1 text-gray-700">
            State
          </label>
          <input
            type="text"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <div className="mb-4 md:mb-0">
          <label htmlFor="amount" className="block text-sm font-medium mb-1 text-gray-700">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            readOnly
            className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-gray-200 cursor-not-allowed"
          />
        </div>

        <div className="col-span-2">
          <button
            type="submit"
            className={`w-full bg-indigo-600 text-white font-bold py-2 rounded ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-700 transition'}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Processing...' : 'Pay Now'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PaymentPage;
