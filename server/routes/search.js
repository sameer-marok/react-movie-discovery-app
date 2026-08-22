import express from 'express';
import Search from '../models/Search.js';

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { searchTerm, movieId, posterUrl } = req.body;

        // Check if the search term already exists in the database
        const existingSearch = await Search.findOne({ searchTerm });

        if (existingSearch) {
            // If it exists, increment the count
            existingSearch.count += 1;

            // Save the updated search document back to the database
            await existingSearch.save();

            // Return the updated search document as a response
            return res.json(existingSearch);
        }
        
        // If it doesn't exist, create a new search document
        const newSearch = await Search.create({searchTerm, movieId, posterUrl})

        res.status(201).json(newSearch);
    } catch (error) {
        console.error("Error saving search term:", error);
        res.status(500).json({ error: "An error occurred while saving the search term." });
    }
})

export default router;
