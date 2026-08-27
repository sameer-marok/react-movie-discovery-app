import "dotenv/config"; // Load environment variables from .env file
import express from "express";
import mongoose from "mongoose";
import searchRouter from "./routes/search.js";
import cors from "cors";

const app = express();

// Render provides the port through an environment variable
// If not provided, it defaults to 5000 for local development
const PORT = process.env.PORT || 5000;

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

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
  });