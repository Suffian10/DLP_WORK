// import { useRef, useCallback, useState } from "react";
// import Webcam from "react-webcam";
// import imageCompression from "browser-image-compression";
// import Axios from "axios";
// import "./Camera.css";

// function Camera() {
//   const camRef = useRef(null);
//   const [saveImage, setSaveImage] = useState(null);
//   const [imgSrcList, setImgSrcList] = useState([]);
//   const capture = useCallback(() => {
//     try {
//       const imageSrc = camRef.current.getScreenshot();
//       setSaveImage(imageSrc); // Save the captured image to state
//     } catch (error) {
//       console.error("Error capturing image:", error);
//     }
//   }, [camRef]);

//   const handleSave = useCallback(async () => {
//     try {
//       if (saveImage) {
//         // Convert base64 saveImage to Blob
//         const blob = await fetch(saveImage).then((res) => res.blob());

//         const options = {
//           maxSizeMB: 0.5,
//           maxWidthOrHeight: 800,
//         };

//         // Compress the image Blob before sending
//         const compressedBlob = await imageCompression(blob, options);

//         // Prepare FormData with compressed image Blob
//         const formData = new FormData();
//         formData.append("file", compressedBlob, "compressed-image.png");

//         // Send the compressed image via POST request to backend
//         const response = await Axios.post(
//           "http://localhost:3001/upload_image", // Update URL with your backend endpoint
//           formData,
//           {
//             headers: {
//               "Content-Type": "multipart/form-data",
//             },
//           }
//         );

//         console.log("Image uploaded to database:", response.data);

//         // Add the uploaded image to the list of displayed images
//         setImgSrcList((prevList) => [...prevList, response.data.url]);
//         setSaveImage(null); // Clear the saveImage state after saving
//       }
//     } catch (error) {
//       console.error("Error saving image to database:", error);
//     }
//   }, [saveImage]);

//   const handleClose = () => {
//     setSaveImage(null);
//   };

//   const handleDelete = (index) => {
//     setImgSrcList((prevList) => prevList.filter((_, i) => i !== index));
//   };

//   return (
//     <div className="camera">
//       <div className="cam">
//         <Webcam audio={false} ref={camRef} screenshotFormat="image/png" />
//       </div>
//       <br />
//       <button onClick={capture}>Take Photo</button>
//       {saveImage && (
//         <>
//           <div className="modal">
//             <div className="modal-content">
//               <img
//                 src={saveImage}
//                 alt="Captured Photo"
//                 style={{ width: "100%" }}
//               />
//               <div className="button-container">
//                 <button onClick={handleSave}>Save</button>
//                 <button onClick={handleClose}>Close</button>
//               </div>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// }

// export default Camera;
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
