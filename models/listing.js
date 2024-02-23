const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sampleListing = new Schema({
    title:{
        type: String,
        required: true
    },
    description:String,
    image:
    {
        type:String,
         default: "https://unsplash.com/photos/white-yacht-in-middle-of-blue-sea-qToVxSYXPYU" ,
        set: (v) =>
         v === ""
          ? "https://unsplash.com/photos/white-yacht-in-middle-of-blue-sea-qToVxSYXPYU" 
          : v,
    },

    price:Number,
    location : String,
    country: String
});

const Listing = mongoose.model("Listing", sampleListing);

module.exports = Listing;