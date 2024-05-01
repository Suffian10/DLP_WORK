import React, { useEffect, useState } from "react";
import "./App.css";
import Camera from "./components/camera/Camera";
import Upload from "./components/upload/Upload";
import Axios from "axios";

function App() {
  const [data, setData] = useState("");
  const [camClick, setCamClick] = useState(false);
  const [upClick, setUpClick] = useState(false);


  const handleCamClick = () => {
    setCamClick(true);
    setUpClick(false);

  };

  const handleUpClick = () => {
    setUpClick(true);
    setCamClick(false);

  };
  return (
    <div className="App">
      {camClick ? (
        <div>
          <Camera />
        </div>
      ) : (
        <>
          <button onClick={handleCamClick}>Camera</button>
        </>
      )}
      {upClick ? (
        <div>
          <Upload />
        </div>
      ) : (
        <>
          <button onClick={handleUpClick}>Upload</button>
        </>
      )}
    </div>
  );
}

export default App;
