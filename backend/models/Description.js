import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    videoId: Number,
    url: String,
});

const imageSchema = new mongoose.Schema({
    url: String,
    width: Number,
    height: Number,
});

const trailerSchema = new mongoose.Schema({
    videoAddress: videoSchema,
    cover: imageSchema,
});

const starsSchema = new mongoose.Schema({
    staffId: Number,
    staffType: Number,
    name: String,
    character: String,
    avatarUrl: String,
})

const resolutionSchema = new mongoose.Schema({
    resolution: String,
    epNum: Number,
})

const seasonSchema = new mongoose.Schema({
    se:Number,
    maxEp: Number,
    resolutions: [resolutionSchema],
})

const metadataSchema = new mongoose.Schema({
    description: String,
    keywords: [String],
    image: String
})

const descriptionSchema = new mongoose.Schema({
    subjectId: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    metadata: metadataSchema,
    trailers: [trailerSchema],
    stars: [starsSchema],
    seasons: [seasonSchema],
    cachedAt:{
        type:Date,
        default:Date.now, 
        expires:60*60*24*7*4*4
    }
})
const DescriptionModel = mongoose.model('Description', descriptionSchema);

export default DescriptionModel;