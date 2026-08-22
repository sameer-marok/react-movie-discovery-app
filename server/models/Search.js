import mongoose from "mongoose";

const searchSchema = new mongoose.Schema({
    searchTerm: {
        type: String,
        required: true,
        unique: true,
    },
    movieId: {
        type: Number,
        required: true,
    },
    posterUrl: {
        type: String,
        required: true,
    },
    count: {
        type: Number,
        default: 1,
    },
});
// Export the model for use in other parts of the application
export default mongoose.model("Search", searchSchema); 