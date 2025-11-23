import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    videoId: String,
    definition: String,
    url: String,
    duration: Number,
    width: Number,
    height: Number,
    size: Number,
    fps: Number,
    bitrate: Number,
    type: Number,
});

const imageSchema = new mongoose.Schema({
    url: String,
    width: Number,
    height: Number,
    size: Number,
    format: String,
    thumbnail: String,
    blurHash: String,
    gif: String,
    avgHueLight: String,
    avgHueDark: String,
    id: String,
});

const trailerSchema = new mongoose.Schema({
    videoAddress: videoSchema,
    cover: imageSchema,
});

const starSchema = new mongoose.Schema({
    staffId: Number,
    staffType: Number,
    name: String,
    character: String,
    avatarUrl: String,
});

const seasonSchema = new mongoose.Schema({
    se: Number,
    maxEp: Number,
    resolutions: [
        {
            resolution: String,
            epNum: Number
        }
    ]
});

const metadataSchema = new mongoose.Schema({
    description: String,
    keyWords: [String],
    image: String
});

const coverSchema = new mongoose.Schema({
    url: String,
    width: Number,
    height: Number
});

const descriptionSchema = new mongoose.Schema({
    subjectId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: String,
    releaseDate: String,
    duration: Number,
    genre: [String],
    cover: coverSchema,
    countryName: String,
    imdbRatingValue: String,
    subtitles: [String],
    trailer: trailerSchema,
    stars: [starSchema],         // map staffList here
    seasons: [seasonSchema],
    metadata: metadataSchema,
    cachedAt: {
        type: Date,
        default: Date.now,
        expires: 60 * 60 * 24 * 7  // 4 months
    }
});

const DescriptionModel = mongoose.model("Description", descriptionSchema);



export default DescriptionModel;
