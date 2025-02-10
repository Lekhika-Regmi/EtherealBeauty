const multer = require("multer");
const path = require("path");
const crypto = require("crypto");

// Configure storage for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Save files in the 'uploads' folder
  },
  filename: function (req, file, cb) {
    // Unique filename using timestamp and random bytes
    cb(null, Date.now() + "-" + crypto.randomBytes(6).toString("hex") + path.extname(file.originalname));
  },
});

// File filter for PNG and JPEG only
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/png" || file.mimetype === "image/jpeg") {
    cb(null, true);
  } else {
    cb(new Error("Only .png and .jpeg files are allowed!"), false);
  }
};

// Setup multer to handle multiple file uploads for govtIssuedId and single file for businessLicense
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
}).fields([
  { name: "govtIssuedId1", maxCount: 1 },  // First government-issued ID file
  { name: "govtIssuedId2", maxCount: 1 },  // Second government-issued ID file
  { name: "businessLicense", maxCount: 1 }, // Single business license file
]);

module.exports = upload;
