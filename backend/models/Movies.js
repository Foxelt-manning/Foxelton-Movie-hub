import mongoose from "mongoose";

const coverSchema = new mongoose.Schema({
    url: String,
    width: Number,
    height: Number,
});

const movieSchema = new mongoose.Schema({
    subjectId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    releaseDate: Date,
    duration: Number,
    subtitle: [String],
    cover: coverSchema,
    genre: [String],
    countryName: [String],
    imdbRatingValue: Number,
    imdbRatingCount: Number,
    cachedAt:{
        type:Date,
        default:Date.now, 
        expires:60*60*24*7*4
    }
});
const Movie = mongoose.model('Movie', movieSchema);

export default Movie;