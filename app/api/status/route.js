import { createOrder } from '@/lib/firestore/createorder/orderwrite';

export async function POST(req) {
  try {
    const rawData = await req.text(); // Get raw text from the request
    const params = new URLSearchParams(rawData); // Parse URL-encoded string into an object
    console.log(params);
    
    const transactionId = params.get('transactionId');
    const amount = params.get('amount');
    const status = params.get('code'); // PAYMENT_SUCCESS or PAYMENT_FAILED
    const providerReferenceId = params.get('providerReferenceId');
    const userId = params.get('userId');
    const name = params.get('fullName');
    console.log(name);
    console.log(userId);

    if (status === 'PAYMENT_SUCCESS') {
      // Prepare order data
      const orderData = {
        transactionId,
        amount,
        status: 'completed',
        providerReferenceId,
        userId,
        createdAt: new Date(),
      };

      // Call the createOrder function to save the order in Firestore
      const orderId = await createOrder(orderData);

      // Redirect to tempcart page after successful payment
      return new Response(null, {
        status: 303,
        headers: {
          Location: '/tempcart', // Adjust the path if necessary
        },
      });
    } else {
      // Return failure response
      return new Response(
        JSON.stringify({
          transactionId,
          amount,
          status: 'failed',
          providerReferenceId,
          message: 'Payment failed',
        }),
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Error processing payment status:', error.message);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
