
"use client";
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { fetchAllData, saveOrder } from '@/lib/firestore/fetchData/read';

const OrderDetailsPage = () => {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processedTransactionIds, setProcessedTransactionIds] = useState(new Set()); // Ensure no duplicate transactionId
  const [countdown, setCountdown] = useState(7); // 7 seconds countdown
  const [isCountingDown, setIsCountingDown] = useState(false); // State to manage blur effect

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/auth/login');
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    const fetchDataForUser = async () => {
      if (!user) return;

      const allData = await fetchAllData();

      if (allData) {
        const { ordersData, orderDetailsData, usersData } = allData;

        const loggedInUser = usersData.find((u) => u.id === user.uid);

        if (loggedInUser) {
          const userOrderDetails = orderDetailsData.filter((detail) => detail.userId === user.uid);

          const combinedData = userOrderDetails.map((detail) => {
            const order = ordersData.find((order) => order.transactionId === detail.transactionId);

            return {
              ...detail,
              ...(order || {}),
              user: loggedInUser,
              userId: loggedInUser.id,
              amount: order ? order.amount : 'N/A',
            };
          });

          setData(combinedData);
        } else {
          setData([]);
        }
      }

      setLoading(false);
    };

    fetchDataForUser();
  }, [user]);

  useEffect(() => {
    // New logic to only process and save unique orders
    const saveOrdersOnce = async () => {
      if (data.length === 0) {
        console.log('No data available for saving.');
        return;
      }

      const newProcessedTransactionIds = new Set(processedTransactionIds);

      for (const entry of data) {
        if (!newProcessedTransactionIds.has(entry.transactionId)) {
          try {
            console.log(`Saving order with transactionId: ${entry.transactionId}`);
            await saveOrder(entry); // Save order
            newProcessedTransactionIds.add(entry.transactionId); // Mark as processed
          } catch (error) {
            console.error(`Error saving order for transactionId: ${entry.transactionId}`, error);
          }
        } else {
          console.log(`Order with transactionId: ${entry.transactionId} already processed.`);
        }
      }

      // Once all orders are processed, update the state
      setProcessedTransactionIds(newProcessedTransactionIds);
    };

    if (data.length > 0) {
      saveOrdersOnce();
    }
  }, [data]); // Remove processedTransactionIds from the dependency array

  // Countdown timer logic
  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
      setIsCountingDown(true); // Start countdown, apply blur

      return () => clearInterval(timer); // Cleanup on unmount
    } else {
      // Redirect when countdown reaches 0
      setIsCountingDown(false); // Remove blur
      router.push('/order');
    }
  }, [countdown, router]);

  if (isLoading) {
    return <p className="text-center text-gray-600">Loading user...</p>;
  }

  return (
    <div className={`container mx-auto p-4 ${isCountingDown ? 'blur-sm' : ''}`}>
      <h1 className="text-2xl font-bold text-center mb-6">Your Order Details</h1>
      {loading ? (
        <p className="text-center text-gray-600">Loading data...</p>
      ) : data.length > 0 ? (
        <div className="flex flex-wrap gap-4">
          {data.map((entry, index) => (
            <div
              key={index}
              className="w-full lg:w-[48%] bg-white shadow-md rounded-md overflow-hidden flex flex-col lg:flex-row p-4 lg:p-6"
            >
              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-2">🛒 Order Data</h2>
                <p className="text-sm"><strong>Transaction ID:</strong> {entry.transactionId}</p>
                <p className="text-sm"><strong>Amount:</strong> {entry.amount}</p>
                <p className="text-sm"><strong>Status:</strong> {entry.status}</p>
                <p className="text-sm"><strong>Created At:</strong> {new Date(entry.createdAt?.seconds * 1000).toLocaleString()}</p>
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-semibold mt-4 lg:mt-0 mb-2">👤 Customer Details</h2>
                <p className="text-sm"><strong>Full Name:</strong> {entry.fullName}</p>
                <p className="text-sm"><strong>Mobile:</strong> {entry.mobile}</p>
                <p className="text-sm"><strong>Address:</strong> {`${entry.addressLine1}, ${entry.addressLine2}, ${entry.addressLine3}`}</p>
                <p className="text-sm"><strong>Pincode:</strong> {entry.pincode}</p>
                <p className="text-sm"><strong>State:</strong> {entry.state}</p>
              </div>
              <div className="flex-1 mt-4 lg:mt-0">
                <h2 className="text-xl font-semibold mb-2">👤 User Information</h2>
                <p className="text-sm"><strong>Display Name:</strong> {entry.user.displayName}</p>
                <p className="text-sm">
                  <strong>Photo URL:</strong>{' '}
                  <img
                    src={entry.user.photoURL}
                    alt={entry.user.displayName}
                    className="h-12 w-12 rounded-full"
                  />
                </p>
                {entry.user.carts && entry.user.carts.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mt-2">🛒 Your Carts</h3>
                    {entry.user.carts.map((cart, cartIndex) => (
                      <div key={cartIndex} className="mt-2">
                        <p className="text-sm"><strong>Flavor:</strong> {cart.flavor}</p>
                        <p className="text-sm"><strong>Weight:</strong> {cart.weight}</p>
                        <p className="text-sm"><strong>Price:</strong> {cart.price}</p>
                        <p className="text-sm"><strong>Sale Price:</strong> {cart.salePrice}</p>
                        <p className="text-sm"><strong>Quantity:</strong> {cart.quantity}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No orders found for your account.</p>
      )}
      
      {/* Display countdown */}
      <div className="text-center mt-4">
        {isCountingDown && (
          <p className="text-sm">
            Redirecting to the order page in <strong>{countdown}</strong> seconds...
          </p>
        )}
      </div>
    </div>
  );
};

export default OrderDetailsPage;
