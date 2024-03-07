const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utilis/wrapAsync.js");
const ExpressError = require("../utilis/ExpressError.js");
// const {reviewSchema} = require("../schema.js")
const Review = require("../models/review.js");
const Listing = require("../models/listing");
const {validateReview, isLoggedIn, isReviewAuthor} = require("../views/middleware.js");
const reviewController = require("../controllers/reviews.js");







 //Reviews
 //post Review route
 router.post("/",isLoggedIn, validateReview, wrapAsync(reviewController.createReview));
  
  
  
  
  // Delete Review Route
  router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(reviewController.destroyReview));

  module.exports = router;
  