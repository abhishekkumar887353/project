const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sampleListing = new Schema({
    title:{
        type: String,
        required: true
    },
    description:String,
    image:{filename:{
        type:String,
    },
    url:{
        type:String,
         default: "https://unsplash.com/photos/photography-of-night-sky-L8126OwlroY" ,
        set: (v) =>
         v === ""
          ? "https://unsplash.com/photos/photography-of-night-sky-L8126OwlroY" 
          : v,
    },
    price:Number,
    location : String,
    country: String
}});

const Listing = mongoose.model("Listing", sampleListing);

module.exports = Listing;