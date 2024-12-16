"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const PermanentOrdersPage = () => {
  const { user, isLoading } = useAuth();
  const [permanentOrders, setPermanentOrders] = useState([]);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    if (!user) {
      router.push("/login");
      return;
    }

    const fetchPermanentOrders = async () => {
      try {
        const ordersQuery = query(
          collection(db, "permanentOrder"),
          where("userId", "==", "gzt5kUw8J1Mq0awEPwGMUQgWm4w2") // Static user ID for example
        );
        const querySnapshot = await getDocs(ordersQuery);
        const ordersData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPermanentOrders(ordersData);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchPermanentOrders();
  }, [user, isLoading, router]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error fetching data: {error}</p>;
  }

  return (
    <div
      className="p-6 space-y-6"
      style={{
        backgroundImage: "url('/order.jpg')", // Set background image
        backgroundSize: "cover", // Ensure background covers the entire container
        backgroundPosition: "center", // Center the background image
        minHeight: "100vh", // Ensure the background takes full screen height
        width: "100%", // Make sure it's full-width
        backgroundAttachment: "fixed", // Make the background fixed while scrolling
      }}
    >
      <h1 className="text-2xl font-bold mb-4 text-white text-center">Permanent Orders</h1>
      {permanentOrders.length > 0 ? (
        permanentOrders.map((order) => (
          <div
            key={order.id}
            className="bg-white bg-opacity-50 p-4 rounded-lg shadow-lg mb-4 w-full mx-auto"
            style={{ backdropFilter: "blur(10px)" }} // Add a blur effect to the card background
          >
            <h2 className="text-lg font-semibold mb-4 text-gray-700">User ID: {order.userId}</h2>

            {/* Cart Items */}
            {order.cartItems && order.cartItems.length > 0 && (
              <div className="mb-6">
                <h3 className="font-semibold text-lg mb-2">Cart Items:</h3>
                <ul className="flex flex-wrap justify-start gap-6">
                  {order.cartItems.map((item, i) => (
                    <li key={i} className="bg-gray-100 p-4 rounded-lg shadow-sm mb-4 flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4">
                      <p><strong>Flavor:</strong> {item.flavor}</p>
                      <p><strong>Price:</strong> ₹{item.price}</p>
                      <p><strong>Sale Price:</strong> ₹{item.salePrice}</p>
                      <p><strong>Quantity:</strong> {item.quantity}</p>
                      <p><strong>Weight:</strong> {item.weight}</p>
                      <p><strong>ID:</strong> {item.id}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Order Details */}
            <div>
              <h3 className="font-semibold text-lg mb-2">Order Details:</h3>
              {order.orderDetails && order.orderDetails.map((detail, i) => (
                <div key={i} className="bg-gray-50 p-4 rounded-lg shadow-sm mb-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div><strong>Full Name:</strong> {detail.fullName}</div>
                    <div><strong>Mobile:</strong> {detail.mobile}</div>
                    <div><strong>Address:</strong> {detail.addressLine1}, {detail.addressLine2}, {detail.addressLine3}</div>
                    <div><strong>State:</strong> {detail.state}</div>
                    <div><strong>Pincode:</strong> {detail.pincode}</div>
                    <div><strong>Transaction ID:</strong> {detail.transactionId}</div>
                    <div><strong>Amount:</strong> ₹{detail.amount}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p className="text-white">No permanent orders found.</p>
      )}
    </div>
  );
};

export default PermanentOrdersPage;
