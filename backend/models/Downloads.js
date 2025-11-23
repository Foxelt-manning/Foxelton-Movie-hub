import mongoose from "mongoose";

const downloadSchema = new mongoose.Schema({
    id: Number,
    quality: String,
    download_url: String,
    stream_url: String,
    size: Number,
    format: String,
    cachedAt:{
        type:Date,
        default:Date.now, 
        expires:60*60*24*7
    }
})

const DownloadModel = mongoose.model('Download', downloadSchema);

export default DownloadModel;