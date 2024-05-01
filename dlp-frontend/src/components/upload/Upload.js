import { useState } from "react" 

function Upload() {
  const [selectedFile, setSelectedFile] = useState(null) 
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null) 
  const handleFileChange = (event) => {
    const file = event.target.files[0] 
    setSelectedFile(file) 
    setUploadedImageUrl(null) 
  } 

  const handleUpload = () => {
    if (selectedFile) {
      const reader = new FileReader() 
      reader.onload = () => {
        const imageUrl = reader.result 
        setUploadedImageUrl(imageUrl) 
      } 
        reader.readAsDataURL(selectedFile) 
        // setSelectedFile(null) 
    } else {
      alert("Please select a file to upload.") 
    }
  } 

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
        </div>
      )}
    </div>
  ) 
}

export default Upload 
