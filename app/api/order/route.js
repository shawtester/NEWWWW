import axios from 'axios';
import crypto from 'crypto';

const salt_key = "96434309-7796-489d-8924-ab56988a6076";
const merchant_id = "PGTESTPAYUAT86";

export async function POST(req) {
  try {
    const { addressLine1, addressLine2, addressLine3, transactionId, MUID, pincode, state, amount, fullName, mobile, userId } = await req.json();

    const data = {
      merchantId: merchant_id,
      merchantTransactionId: transactionId,
      fullName: fullName,
      amount: amount * 100,
      userId,
      redirectUrl: `http://localhost:3000/api/status`,
      redirectMode: 'POST',
      mobileNumber: mobile,
      paymentInstrument: {
        type: "PAY_PAGE"
      }
    };

    // Log the data being sent to PhonePe
    console.log("Data to be sent to PhonePe:", data);

    // Step 3: Encode and create checksum
    const payload = JSON.stringify(data);
    const payloadMain = Buffer.from(payload).toString('base64');
    const string = payloadMain + '/pg/v1/pay' + salt_key;
    const sha256 = crypto.createHash('sha256').update(string).digest('hex');
    const checksum = sha256 + '###' + 1;  // KeyIndex = 1

    console.log("Checksum generated:", checksum);

    const prod_URL = "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay";

    // Step 4: Call PhonePe API
    const options = {
      method: "POST",
      url: prod_URL,
      headers: {
        'accept': "application/json",
        "content-type": "application/json",
        "X-VERIFY": checksum,
        'X-MERCHANT-ID': merchant_id,
      },
      data: {
        request: payloadMain
      }
    };

    // Make the API call to PhonePe
    const response = await axios(options);
    console.log("Response from PhonePe:", response.data);

    // Step 5: Return response data
    return new Response(JSON.stringify(response.data), { status: 200 });

  } catch (error) {
    // Improved error logging for debugging
    console.error("Error creating order:", error.response?.data || error.message);
    return new Response(JSON.stringify({ error: error.response?.data || error.message }), { status: 500 });
  }
}
