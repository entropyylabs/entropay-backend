const express = require("express");
const cors = require("cors");
const makeRequest = require("./utilities").makeRequest;

const createButtonDocument = require("./services/createButton")
  .createButtonDocument;

const createCheckout = require("./services/createCheckout").createCheckout;

const getButton = require("./services/getButton").getButton;

const app = express();

const port = process.env.PORT || 5000;

app.set("json spaces", 4);

app.listen(port);

app.use(cors());
const corsOptions = {
  origin: "http://localhost:3000",
};
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/create-button", async (req, res) => {
  var data = req.body;
  console.log(data);
  const amount = data.amount;
  const text = data.text;

  const checkoutPage = await createCheckout(data.amount);

  res.json({
    amount,
    text,
  });
  await createButtonDocument({
    amount,
    text,
  });
});

app.get("/get-button/:buttonID", async (req, res) => {
  const buttonID = req.params["buttonID"];
  const button = await getButton(buttonID);
  if (button) {
    res.json(button);
  } else {
    res.json("error");
  }
});

app.get("/get-checkout/:buttonID", async (req, res) => {
  const buttonID = req.params["buttonID"];
  const button = await getButton(buttonID);
  if (button) {
    const amount = button.amount;
    const checkoutPage = await createCheckout(amount);
    console.log(checkoutPage);
    res.json({ checkoutPage: checkoutPage });
  } else {
    res.json("error");
  }
});

app.post("/checkout", async (req, res) => {
  var data = req.body;
  console.log(req.body);
  const amount = data.amount;
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
    res.json(result);
    console.log(result.body.data.id);
  } catch (error) {
    res.json(error);
  }
});
