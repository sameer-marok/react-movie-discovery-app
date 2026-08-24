import "dotenv/config"; // Load environment variables from .env file
import express from "express";
import mongoose from "mongoose";
import searchRouter from "./routes/search.js";
import cors from "cors";

const app = express();

// Enable CORS for all routes to allow cross-origin requests
app.use(cors());

// Middleware to parse incoming JSON requests
app.use(express.json());

// Use the searchRouter for handling search-related routes
app.use("/api/search", searchRouter);

// Connect to MongoDB
mongoose
    // Use the connection string from the environment variable
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected");

    app.listen(5000, () => {
      console.log("Server running on http://localhost:5000");
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
  });