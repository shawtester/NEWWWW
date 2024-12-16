
"use client";
import { useState, useEffect } from 'react';
import { fetchFinalOrderData } from "@/lib/firestore/fetchData/write";
import { useRouter } from 'next/navigation';
import { useAuth } from "@/context/AuthContext";
import Header from '../components/Header';

const FinalOrderPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, isLoading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (authLoading) return;

    const fetchData = async () => {
      if (user) {
        const finalOrderData = await fetchFinalOrderData();
        const filteredData = finalOrderData?.filter((entry) => entry.userId === user.uid) || [];
        setData(filteredData);
      } else {
        setData([]);
      }
      setLoading(false);
    };

    fetchData();
  }, [user, authLoading]);

  return (
    <>
      <Header />
      <div style={{ padding: "20px", fontFamily: "'Roboto', sans-serif" }}>
        <h1 style={{ textAlign: "center", marginBottom: "30px", fontSize: "2rem", color: "#333" }}>
          🛒 YOUR ORDERS
        </h1>
        {loading ? (
          <p style={{ textAlign: "center", fontSize: "1.2rem", color: "#555" }}>Loading orders...</p>
        ) : data.length > 0 ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
            {data.map((entry, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "20px",
                  border: "1px solid #ddd",
                  borderRadius: "12px",
                  padding: "20px",
                  background: "#fff",
                  boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.02)";
                  e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "0 6px 12px rgba(0, 0, 0, 0.1)";
                }}
              >
                {/* Order Data */}
                <div style={{ flex: "1 1 30%", minWidth: "250px" }}>
                  <h3 style={{ fontSize: "1.3rem", color: "#007BFF" }}>📦 Order Details</h3>
                  <p><strong>Transaction ID:</strong> {entry.transactionId}</p>
                  <p><strong>Amount:</strong> ₹{entry.amount}</p>
                  <p><strong>Status:</strong>
                    <span
                      style={{
                        color: entry.status === "completed" ? "#28a745" : "#dc3545",
                        fontWeight: "bold",
                      }}
                    >
                      {entry.status}
                    </span>
                  </p>
                  <p><strong>Order Status:</strong> 
                    <span
                      style={{
                        color: entry.OrderStatus === "pending" ? "#ffc107" : "#28a745",
                        fontWeight: "bold",
                      }}
                    >
                      {entry.OrderStatus}
                    </span>
                  </p>
                  <p><strong>Created At:</strong> {new Date(entry.createdAt?.seconds * 1000).toLocaleString()}</p>
                </div>

                {/* Customer Details */}
                <div style={{ flex: "1 1 30%", minWidth: "250px" }}>
                  <h3 style={{ fontSize: "1.3rem", color: "#007BFF" }}>👤 Customer Details</h3>
                  <p><strong>Full Name:</strong> {entry.fullName}</p>
                  <p><strong>Mobile:</strong> {entry.mobile}</p>
                  <p><strong>Address:</strong> {`${entry.addressLine1}, ${entry.addressLine2}, ${entry.addressLine3}`}</p>
                  <p><strong>Pincode:</strong> {entry.pincode}</p>
                  <p><strong>State:</strong> {entry.state}</p>
                </div>

                {/* User Information */}
                {entry.user && (
                  <div style={{ flex: "1 1 30%", minWidth: "250px" }}>
                    <h3 style={{ fontSize: "1.3rem", color: "#007BFF" }}>👨‍💻 User Information</h3>
                    <p><strong>Display Name:</strong> {entry.user.displayName}</p>
                    <p>
                      <strong>Photo:</strong>{" "}
                      <img
                        src={entry.user.photoURL}
                        alt={entry.user.displayName}
                        style={{
                          height: "60px",
                          width: "60px",
                          borderRadius: "50%",
                          objectFit: "cover",
                          border: "2px solid #007BFF",
                        }}
                      />
                    </p>
                  </div>
                )}

                {/* Cart Information */}
                {entry.carts && entry.carts.length > 0 && (
                  <div style={{ flex: "1 1 100%" }}>
                    <h3 style={{ fontSize: "1.3rem", color: "#007BFF" }}>🛍️ Your Carts</h3>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                        gap: "15px",
                      }}
                    >
                      {entry.carts.map((cart, cartIndex) => (
                        <div
                          key={cartIndex}
                          style={{
                            border: "1px solid #eee",
                            borderRadius: "8px",
                            padding: "10px",
                            textAlign: "center",
                            background: "#f9f9f9",
                          }}
                        >
                          <p><strong>Flavor:</strong> {cart.flavor}</p>
                          <p><strong>Weight:</strong> {cart.weight}</p>
                          <p><strong>Price:</strong> ₹{cart.price}</p>
                          <p><strong>Sale Price:</strong> ₹{cart.salePrice}</p>
                          <p><strong>Quantity:</strong> {cart.quantity}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p style={{ textAlign: "center", fontSize: "1.2rem", color: "#555" }}>
            No final orders found.
          </p>
        )}
      </div>
    </>
  );
};

export default FinalOrderPage;
