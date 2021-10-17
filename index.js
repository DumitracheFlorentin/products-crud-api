// Import Dependencies
const express = require("express");
require("dotenv").config();

// Init Server
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use("/api/users", require("./routes/products"));

// Init PORT
const PORT = process.env.PORT || 5000;

// Start The Server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
