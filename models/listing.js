const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");



const sampleListing = new Schema({
    title:{
        type: String,
        required: true
    },
    description:String,
    image:
    {

        url: String,
        filename: String,
        // type:String,
        //  default: "https://images.unsplash.com/photo-1565413294262-fa587c396965?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" ,
        // set: (v) =>
        //  v === ""
        //   ? "https://images.unsplash.com/photo-1565413294262-fa587c396965?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
        //   : v,
    },

    price:Number,
    location : String,
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"

        },

    ],

    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },

    geometry: {
          type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
    }

});

sampleListing.post("findOneAndDelete", async(listing) =>{
    if (listing){
    await Review.deleteMany({_id : {$in: listing.reviews}});
}
});

const Listing = mongoose.model("Listing", sampleListing );

module.exports = Listing;