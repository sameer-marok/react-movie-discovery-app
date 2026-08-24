import mongoose from "mongoose";

const searchSchema = new mongoose.Schema({
    searchTerm: {
        type: String,
        required: true,
    },
    movieId: {
        type: Number,
        required: true,
        unique: true
    },
    posterUrl: { // some cases poster url could be missing so not adding required
        type: String,
    },
    count: {
        type: Number,
        default: 1,
    },
});
// Export the model for use in other parts of the application
export default mongoose.model("Search", searchSchema); 