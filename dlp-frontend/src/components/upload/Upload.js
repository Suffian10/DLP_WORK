import { useState, useCallback } from "react";
import imageCompression from "browser-image-compression";
import Axios from "axios";

function Upload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setUploadedImageUrl(null);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageUrl = reader.result;
        setUploadedImageUrl(imageUrl);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      alert("Please select a file to upload.");
    }
  };

  const handleSave = useCallback(async () => {
    if (selectedFile) {
      try {
        // Compress the selected file before sending
        const options = {
          maxSizeMB: 1.0,
          maxWidthOrHeight: 800,
        };
        const compressedFile = await imageCompression(selectedFile, options);

        // Generate a unique URL for the image (using timestamp)
        const imageUrl = `http://example.com/images/${Date.now()}.png`;

        // Prepare FormData with compressed image file and URL
        const formData = new FormData();
        formData.append("file", compressedFile, "uploaded-image.png");
        formData.append("imageUrl", imageUrl);

        // Send the compressed image data and URL to the backend via POST request
        const response = await Axios.post(
          "http://localhost:3001/upload_image",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("Image uploaded to server:", response.data);

        // Display success message or perform additional actions upon successful upload
        alert("Image saved successfully!");

        // Clear the selected file state after saving
        setSelectedFile(null);
      } catch (error) {
        console.error("Error saving image:", error);
        alert("Failed to save image. Please try again.");
      }
    } else {
      alert("Please upload an image before saving.");
    }
  }, [selectedFile]);

  return (
    <div className="file-upload">
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {uploadedImageUrl && (
        <div>
          <p>Uploaded Image:</p>
          <img
            src={uploadedImageUrl}
            alt="Uploaded"
            style={{ maxWidth: "100%", maxHeight: "300px" }}
          />
          <button onClick={handleSave}>Save</button>
        </div>
      )}
    </div>
  );
}

export default Upload;
