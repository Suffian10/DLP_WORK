import React, { useRef, useCallback, useState } from "react";
import Webcam from "react-webcam";
import imageCompression from "browser-image-compression";
import Axios from "axios";
import "./Camera.css";

function Camera() {
  const camRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);

  const capture = useCallback(() => {
    const imageSrc = camRef.current.getScreenshot();
    setCapturedImage(imageSrc); // Save the captured image to state
  }, [camRef]);

  const handleSave = useCallback(async () => {
    if (capturedImage) {
      try {
        // Convert base64 captured image to Blob
        const blob = await fetch(capturedImage).then((res) => res.blob());

        // Compress the image Blob before sending
        const options = {
          maxSizeMB: 1.0,
          maxWidthOrHeight: 800,
        };
        const compressedBlob = await imageCompression(blob, options);

        // Generate a unique URL for the image (can use a timestamp)
        const imageUrl = `http://example.com/images/${Date.now()}.png`;

        // Prepare FormData with compressed image Blob and URL
        const formData = new FormData();
        formData.append("file", compressedBlob, "captured-image.png");
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

        console.log("Image uploaded to database:", response.data);

        // Clear capturedImage state after saving
        setCapturedImage(null);
      } catch (error) {
        console.error("Error saving image to database:", error);
      }
    }
  }, [capturedImage]);

  return (
    <div className="camera">
      <div className="cam">
        <Webcam audio={false} ref={camRef} screenshotFormat="image/png" />
      </div>
      <br />
      <button onClick={capture}>Take Photo</button>
      {capturedImage && (
        <div className="modal">
          <img
            src={capturedImage}
            alt="Captured Photo"
            style={{ width: "100%" }}
          />
          <div className="button-container">
            <button onClick={handleSave}>Save</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Camera;
