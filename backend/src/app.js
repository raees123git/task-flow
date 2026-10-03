const express = require("express");
const cors = require('cors');
const todoRoutes = require("./routes/todoRoutes");
const authRoutes = require("./routes/authRoutes");


const app = express();

app.use(cors({
  origin: 'http://localhost:5173'
}));

app.use(express.json());

app.use("/todos", todoRoutes);
app.use("/auth", authRoutes);

module.exports = app;