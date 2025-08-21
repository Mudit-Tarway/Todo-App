const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Route imports
const authRoutes = require("../Routes/authRoutes");
const todoRoutes = require("../Routes/todoRoutes");

const app = express();

// ------------------- MIDDLEWARE -------------------
app.use(cors());
app.use(express.json());

// ------------------- ROUTES -------------------
app.use("/api/auth", authRoutes);
app.use("/api/todo", todoRoutes);

// ------------------- MONGODB CONNECTION -------------------
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// ------------------- SERVER START -------------------
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running`);
});
