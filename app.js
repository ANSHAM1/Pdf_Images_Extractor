const express = require("express");
const app = express();

const path = require("path");

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static("public"));
app.use("/views",express.static("./src/views"));
app.use("/static", express.static("static"));

const { router } = require(`./src/routes/routes.js`);

app.use("/api", router);

module.exports = { app };
