const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const WebSocket = require('ws');

const packageRoutes = require("./routes/package");
const deliveryRoutes = require("./routes/delivery");

// mongodb+srv://chakir:<password>@cluster0.v9q98v4.mongodb.net/?retryWrites=true&w=majority

const app = express();

mongoose
    .connect(
        "mongodb+srv://chakir:" + 
        process.env.MONGO_ATLAS_PW + 
        "@cluster0.v9q98v4.mongodb.net/?retryWrites=true&w=majority"
    )
    .then(() => {
        console.log("DB Connected !");
    })
    .catch(() => {
        console.log("DB Connexion failed !");
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/delivery", deliveryRoutes);
app.use("/api/package", packageRoutes);

// testing socket
const socket = new WebSocket('ws://localhost:3000');
socket.addEventListener('open', function(event) {
  // console.log(event);
  console.log('Connected to the aaa server');
  socket.send('Hello from client');
});

socket.addEventListener('message', function(event) {
  console.log('Message from server =>> ', event.data);
});


module.exports = app;
