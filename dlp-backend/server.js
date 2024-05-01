const express = require("express");
const images = require("./model/model");
const app = express();
const mongoose = require("./config/db");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const port = 3001; // Or any port of your choice
const db = mongoose.connection;

// Middleware to allow cross-origin requests
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// Configure multer for file uploads
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // Maximum file size (10 MB)
  },
}).single("file"); // Accept only single file upload with field name 'file'

// Route handler for POST request to /upload_image
app.post("/upload_image", async (req, res) => {
  // Handle file upload using multer
  upload(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      // Multer error occurred (e.g., file size limit exceeded)
      return res.status(400).json({ message: "File size limit exceeded" });
    } else if (err) {
      // Other errors occurred
      return res
        .status(500)
        .json({ message: "Internal server error", error: err.message });
    }

    // Access uploaded file from req.file
    const { originalname, buffer } = req.file;

    try {
      // Save image data to the database
      const newImage = new images({
        filename: originalname,
        imageUrl: "", // Placeholder for image URL
      });

      // Save the image document to the database
      await newImage.save();

      // Generate URL for the uploaded image
      const imageUrl = `http://localhost:${port}/images/${newImage._id}`;

      // Update the image document with the generated URL
      newImage.imageUrl = imageUrl;
      await newImage.save();

      // Respond with success message and image URL
      return res
        .status(200)
        .json({ message: "Image saved successfully!", imageUrl: imageUrl });
    } catch (error) {
      // Handle database save error
      console.error("Error saving image:", error);
      return res
        .status(500)
        .json({ message: "Failed to save image", error: error.message });
    }
  });
});

// Database connection event listener
db.once("open", function () {
  console.log("Database Connected Successfully");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
