const express = require("express");
const cors = require('cors');
const todoRoutes = require("./routes/todoRoutes");

const app = express();

app.use(cors({
  origin: 'http://localhost:5173'
}));

app.use(express.json());

app.use("/todos", todoRoutes);

module.exports = app;