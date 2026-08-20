const express = require("express");

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

app.get("/", async (req, res) => {
    res.json({ message: "Backend is working!" });
})

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
})