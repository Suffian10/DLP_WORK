const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  image: String, // Base64-encoded image data
  imageUrl: String, // URL of the image
});

const Image = mongoose.model("Image", imageSchema);

module.exports = Image;
