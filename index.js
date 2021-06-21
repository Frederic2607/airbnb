// Import packages
const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");

const app = express();
app.use(formidable());
app.use(cors());
app.use(helmet());

// Connexion BDD
mongoose.connect("mongodb://localhost/airbnb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

// Import Routes
const userRoutes = require("./routes/user");
app.use(userRoutes);
const roomRoutes = require("./routes/room");
app.use(roomRoutes);

// Main page
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to Airbnb API" });
});

// Other page
app.all("*", (req, res) => {
  res.status(404).json({ message: "Page not found" });
});

app.listen(3000, () => {
  console.log("Server Started");
});
