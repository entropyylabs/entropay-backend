const { db } = require("../helpers/admin");
const shortid = require("shortid");

const createButtonDocument = async (button) => {
  if (!button) return;
  try {
    const buttonID = shortid.generate();

    ({ amount, text } = button);

    db.collection("Buttons").doc(buttonID).set({
      buttonID,
      amount,
      text,
    });
  } catch (error) {
    console.log("Error :: creating user", error);
  }
};

module.exports = { createButtonDocument };
