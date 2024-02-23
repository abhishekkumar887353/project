const express= require("express");
const app=  express();
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const path =require("path");//ejs
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

main()
.then(()=>{
    console.log("connected to DB")
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/majorP');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

app.set("view.engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));//taki data sara pars hopaye 
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

//Index Route
app.get("/listings", async (req,res) => {
     const allListings = await Listing.find({});
      res.render("./listings/index.ejs" , {allListings});
});


//New Route
app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
})




//Show Route
app.get("/listings/:id", async (req, res) => {
    let {id}= req.params;
    const listing = await Listing.findById(id);
    console.log(listing);
    res.render("./listings/show.ejs", {listing});
});


//Create Route
app.post("/listings", async (req, res) => {
    //let {title,description,image,price,country,location} = req.body;
    // let listing = req.body.listing;
   const newListing = new Listing (req.body.listing);
   await newListing.save();
    res.redirect("/listings");
});


//Edit Route
 app.get("/listings/:id/edit", async(req, res) => {
    let {id}= req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", {listing});
 }) ;


 //update route
 app.put("/listings/:id", async(req, res) => {
    let {id}= req.params;
  await  Listing.findByIdAndUpdate(id, {...req.body.listing}) ;
  res.redirect(`/listings/${id}`);
 })


 //Delete route
 app.delete("/listings/:id", async(req, res) => {
    let {id}= req.params;
    let deleteListing = await Listing.findByIdAndDelete(id);
    console.log(deleteListing);
    res.redirect("/listings");
 })


// app.get("/testing", async(req,res)=>{
//     const listingSample = new Listing({
//         title:"Home villa",
//         description:"By the Beach",
//         image:"",
//         price:25000,
//         location:"Goa",
//         country:"India"

//     });
//     await listingSample.save();
//     console.log("sample was saved")
//     res.send("Success");

// })

app.get("/", (req,res)=>{
    res.send("Hello");
})

app.listen("8080", ()=>{
    console.log("Server is started");
})