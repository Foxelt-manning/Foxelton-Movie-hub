import mongoose from "mongoose";

const downloadLinksSchema = new mongoose.Schema({
   id:Number,
   url:String,
   resolution:String,
   size:String

})

const CaptionsSchema = new mongoose.Schema({
   id: Number,
   lan: String,
   url: String,
   size: String,
   delay: Number

})

const StreamLinkSchema = new mongoose.Schema({
    id: Number,
    quality: Number,
    directUrl: String,
    proxyUrl : String,
    size: Number,
    format: String
})

const downloadSchema = new mongoose.Schema({
   subjectId: {type:Number, required:true},
   downloads:[downloadLinksSchema],
   captions:[CaptionsSchema],
   stream:[StreamLinkSchema]
})

const DownloadModel = mongoose.model('Download', downloadSchema);

export default DownloadModel;