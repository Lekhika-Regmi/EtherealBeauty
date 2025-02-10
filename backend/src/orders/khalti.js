
const axios = require("axios");

async function initializeKhaltiPayment({ amount, purchase_order_id, purchase_order_name, return_url, website_url }) {
  try {
    console.log("🔄 Sending Request to Khalti:", { amount, purchase_order_id, purchase_order_name, return_url, website_url });

    const response = await axios.post("https://a.khalti.com/api/v2/epayment/initiate/", {
      return_url,
      website_url,
      amount,
      purchase_order_id,
      purchase_order_name,
    }, {
      headers: {
        Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    });

    console.log("✅ Khalti API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error in Khalti API Call:", error.response?.data || error.message);
    return { success: false, error: error.message };
  }
}

module.exports = { initializeKhaltiPayment };
