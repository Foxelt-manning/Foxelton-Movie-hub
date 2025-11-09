import mongoose, { Schema } from "mongoose";
import Movie from "./Movies";
import DescriptionModel from "./Description";

const Overall = new mongoose.Schema ({
 MovieType : DescriptionModel.seasons,
 Movie :Movie
})

const OverallInfo = new mongoose.model("Overall Data",Overall)

export default OverallInfo;