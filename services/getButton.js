const { db } = require("../helpers/admin");

const getButton = async (buttonID) => {
  if (!buttonID) return;
  try {
    const buttonData = await db.collection("Buttons").doc(buttonID).get();
    return buttonData.data();
  } catch (error) {
    console.log("Error :: creating user", error);
  }
  return null;
};

module.exports = { getButton };
