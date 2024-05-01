import React, { useEffect, useState } from "react";
import "./App.css";
import Camera from "./components/camera/Camera";
import Upload from "./components/upload/Upload";
import Axios from "axios";

function App() {
  const [data, setData] = useState("");
  const [camClick, setCamClick] = useState(false);

  const handleCamClick = () => {
    setCamClick(true);
  };

  //   const fetchData = async () => {
  //     try {
  //       const response = await Axios.get("http://localhost:5000/data");
  //       setData(response.data.message);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  // useEffect(() => {
  //   fetchData(); 
  // }, []); 

  return (
    <div className="App">
      {camClick ? (
        <div>
          <Camera />
        </div>
      ) : (
        <>
          <button onClick={handleCamClick}>Camera</button>
          <Upload />
        </>
      )}
    </div>
  );
}

export default App;
