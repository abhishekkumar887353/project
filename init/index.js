const mongoose = require("mongoose");
const initData = require("./data");
const Listing = require("../models/listing");

main()
.then(()=>{
    console.log("connected to DB")
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/majorP');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
const initDB = async () =>{
   await Listing.deleteMany({});
   await Listing.insertMany(initData.data);
   console.log("data was initialized");
};

initDB();