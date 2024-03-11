const express = require("express");
const router = express.Router();
const wrapAsync = require("../utilis/wrapAsync.js");
// const {listingSchema} = require("../schema.js");
// const ExpressError = require("../utilis/ExpressError.js");
const Listing = require("../models/listing");
const {isLoggedIn, isOwner, validateListing} = require("../views/middleware.js");


const listingController = require("../controllers/listings.js");

const multer  = require('multer');
 const { storage } = require("../cloudConfig.js");

const upload = multer({ storage });



router.route("/")
.get(  wrapAsync(listingController.index))
 .post(  isLoggedIn, upload.single("listing[image]"), validateListing, wrapAsync(listingController.createListing));

//  .post( (req,res) => {
//     res.send(req.file);
// });


//New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);


router.route("/:id")
.get( wrapAsync(listingController.showListing)
)
.put( isLoggedIn, isOwner,upload.single("listing[image]"), validateListing, wrapAsync(listingController.updateListing)
)
.delete( isLoggedIn, isOwner,  wrapAsync(listingController.destroyListing));

//Edit Route
router.get("/:id/edit", isLoggedIn, isOwner,  wrapAsync(listingController.renderEditForm));


 


// //Index Route
// router.get("/",  wrapAsync(listingController.index));






//Show Route
// router.get("/:id", wrapAsync(listingController.showListing));


// //Create Route
// router.post("/",  isLoggedIn, validateListing, wrapAsync(listingController.createListing));




//update route
// router.put("/:id", isLoggedIn, isOwner, validateListing, wrapAsync(listingController.updateListing)
// );


//Delete route
// router.delete("/:id", isLoggedIn, isOwner,  wrapAsync(listingController.destroyListing));



module.exports = router;
