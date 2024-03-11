if(process.env.NODE_ENV != "production") {
    require('dotenv').config();
}

console.log(process.env.SECRET);


const express= require("express");
const app=  express();
const mongoose = require("mongoose");
const Listing = require("./models/listing");
const path =require("path");//ejs
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utilis/wrapAsync.js");
const ExpressError = require("./utilis/ExpressError.js");
const {listingSchema, reviewSchema} = require("./schema.js");
const Review = require("./models/review");
const session = require("express-session");
const flash = require("connect-flash");
const passport =require ("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");


const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");


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


const sessionOptions = {
    secret : "mysupersecretcode",
    resave: false,
    saveUnintilialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge:  7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    },
};



app.get("/", (req,res)=>{
    res.send("Hi I m root");
});



app.use(session(sessionOptions));
app.use(flash());


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;

    next();
});

// app.get("/demouser", async (req, res) => {
//     let fakeUser = new User({
//         email: "student@gmail.com",
//         username: "delta-student" ///automatically username schema passport add kar deta hai.
//     });

//      let registeredUser = await User.register(fakeUser, "helloworld");
//      res.send(registeredUser);
// })

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);




// const validateReview = (req, res, next) => {
//     let {error}= reviewSchema.validate(req.body);
   
//     if(error){
//         let errMsg  = error.details.map((el) => el.message).join(",");
//      throw new ExpressError(400,errMsg);
//     } else{
//         next();
//     }
// };

// //Index Route
// app.get("/listings",  wrapAsync(async (req,res) => {
//      const allListings = await Listing.find({});
//       res.render("./listings/index.ejs" , {allListings});
// })
// );


// //New Route
// app.get("/listings/new",  wrapAsync((req, res) => {
//     res.render("listings/new.ejs");
// })
// );




// //Show Route
// app.get("/listings/:id", wrapAsync(async (req, res) => {
//     let {id}= req.params;
//     const listing = await Listing.findById(id).populate("reviews");
//     console.log(listing);
//     res.render("./listings/show.ejs", {listing});
// })
// );


// //Create Route
// app.post("/listings", validateListing, wrapAsync(async (req, res, next) => {

//     const newListing = new Listing(req.body.listing);
//    await newListing.save();
//     res.redirect("/listings");
// })
//     //let {title,description,image,price,country,location} = req.body;
//     // let listing = req.body.listing;
//     // if(!req.body.listing) {
//     //     throw new ExpressError(400,"send valid data for listing");
//     // }
//     //  const newListing = new Listing (req.body.listing);
//     //  if(!newListing.title){
//     //     throw new ExpressError(400,"Title is missing");
//     //  }
     
//     //  if(!newListing.description){
//     //     throw new ExpressError(400,"Description is missing");
//     //  }
//     //  if(!newListing.location){
//     //     throw new ExpressError(400,"Location is missing");
//     //  }
//     //  if(!newListing.country){
//     //     throw new ExpressError(400,"Country is missing");
//     //  }
  
 
// );


// //Edit Route
//  app.get("/listings/:id/edit",  wrapAsync(async(req, res) => {
//     let {id}= req.params;
//     const listing = await Listing.findById(id);
//     res.render("listings/edit.ejs", {listing});
//  }) 
//  );


//  //update route
//  app.put("/listings/:id", validateListing, wrapAsync(async(req, res, next) => {
    
//     let {id}= req.params;
//   await  Listing.findByIdAndUpdate(id, {...req.body.listing}) ;
//   res.redirect(`/listings/${id}`);
//  })
//  );


//  //Delete route
//  app.delete("/listings/:id",  wrapAsync(async(req, res) => {
//     let {id}= req.params;
//     let deleteListing = await Listing.findByIdAndDelete(id);
//     console.log(deleteListing);
//     res.redirect("/listings");
//  })
//  );



//  //Reviews
//  //post Review route
// app.post("/listings/:id/reviews", validateReview, wrapAsync(async(req,res) => {
//   let listing = await Listing.findById(req.params.id);
//   let newReview = new Review(req.body.review);

//   listing.reviews.push(newReview);
//   await newReview.save();
//   await listing.save();
//   console.log("new review saved");
//   res.redirect(`/listings/${listing._id}`);

// }));




// // Delete Review Route
// app.delete("/listings/:id/reviews/:reviewId", wrapAsync(async(req, res) => {
//   let{id, reviewId } = req.params;
//   await Listing.findByIdAndUpdate(id, {$pull: {reviews:reviewId}});
//  await Review.findByIdAndDelete(reviewId);
//  res.redirect(`/listings/${id}`);
// })
// )

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


app.all("*", (res, req, next) => {
next(new ExpressError(404,  "Page not Found !"));
});

app.use((err, req, res, next) => {
    let {statusCode = 500, message = "Something went wrong"} = err;
 res.status(statusCode).render("listings/error.ejs", {message});
    // res.status(statusCode).send(message);
});

app.listen("8080", ()=>{
    console.log("Server is started");
})