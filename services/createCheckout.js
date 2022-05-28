const makeRequest = require("../utilities").makeRequest;

const createCheckout = async (amount) => {
  try {
    const body = {
      amount: amount,
      complete_payment_url: "http://example.com/complete",
      country: "IN",
      currency: "INR",
      error_payment_url: "http://example.com/error",
      merchant_reference_id: "0912-2021",
      language: "en",
      metadata: {
        merchant_defined: true,
      },
      payment_method_types_include: ["in_bharatpay_cash"],
    };
    const result = await makeRequest("POST", "/v1/checkout", body);

    return result.body.data.id;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createCheckout };
