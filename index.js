import express from "express";
import dotenv from "dotenv";
import productRoutes from "./routes/products.js";

dotenv.config();

// Init Server
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use("/api/users", productRoutes);

// Init PORT
const PORT = process.env.PORT || 5000;

// Start The Server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
