import mongoose from "mongoose";

const PrefixModel = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  prefix: String || Number,
});

const Prefix = mongoose.model("Prefix", PrefixModel, "prefix");
export default Prefix;
