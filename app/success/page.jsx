"use client";

import { useRouter } from "next/navigation";

const SuccessPage = () => {
  const router = useRouter();
  
  // Destructure the query parameters from the URL
  const { transactionId, amount, providerReferenceId, status, message } = router.query;

  if (!transactionId || !amount || !providerReferenceId || !status || !message) {
    return <p>Loading...</p>; // Show loading until data is available
  }

  return (
    <div>
      <h1>Payment Status: {status === 'completed' ? 'Success' : 'Failure'}</h1>
      <p><strong>Transaction ID:</strong> {transactionId}</p>
      <p><strong>Amount:</strong> {amount}</p>
      <p><strong>Provider Reference ID:</strong> {providerReferenceId}</p>
      <p><strong>Message:</strong> {decodeURIComponent(message)}</p>
    </div>
  );
};

export default SuccessPage;
