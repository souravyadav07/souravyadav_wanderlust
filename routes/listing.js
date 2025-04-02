const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");

const listingController = require("../controllers/listing.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

router
  .route("/")
  .get(wrapAsync(listingController.index)) //----------->Index Route
  .post(        //------------------>Create Route
    isLoggedIn,
    
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.createListing)
  );

//New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

router
  .route("/:id")
  .get(wrapAsync(listingController.showListing)) //------------>Show Route
  .put(                 //----------------->Update Route
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingController.updateListing)
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingController.destroyListing)); // ---------->Delete Route

//Edit Route
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingController.renderEditListing)
);

// // Search route
// router.get('/search', async (req, res) => {
//   try {
//       let { query } = req.query; // Get search query from request
//       if (!query) {
//           return res.status(400).json({ message: "Search query is required" });
//       }

//       // Find listings where country matches the query (case insensitive)
//       const listings = await Listing.find({ country: { $regex: query, $options: "i" } });

//       res.json(listings);
//   } catch (error) {
//       res.status(500).json({ message: "Server Error", error });
//   }
// });

module.exports = router;
