import "dotenv/config"; // Load environment variables from .env file
import express from "express";
import mongoose from "mongoose";

const app = express();

app.use(express.json());

app.get("/", async (req, res) => {
    res.json({ message: "Backend is working!" });
})

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