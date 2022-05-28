const firebase = require("firebase");

const firebaseConfig = {
  apiKey: "AIzaSyAF2Q1zsq8c7mo1uib55UMEC8E23uvXkrk",
  authDomain: "entropay-4e6de.firebaseapp.com",
  projectId: "entropay-4e6de",
  storageBucket: "entropay-4e6de.appspot.com",
  messagingSenderId: "845677373655",
  appId: "1:845677373655:web:7ba02cde08ce376f216892",
  measurementId: "G-FJLDQ8BBT3",
};

firebase.initializeApp(firebaseConfig); //initialize firebase app
module.exports = { firebase }; //export the app
