import React, { useState } from "react";
import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import VideoPlayer from "./Pages/VideoPlayer";

function App() {
  const [sideBar, setSideBar] = useState(true);
  const [videos, setVideos] = useState([]);
  const [query, setQuery] = useState("");
  const [isOpen, setIsopen] = useState(false);

  return (
    <div>
      <NavBar
        setSideBar={setSideBar}
        setQuery={setQuery}
        isOpen={isOpen}
        setIsopen={setIsopen}
      />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              sideBar={sideBar}
              setVideos={setVideos}
              setQuery={setQuery}
              query={query}
              isOpen={isOpen}
              setIsopen={setIsopen}
            />
          }
        />
        <Route
          path="/video/:videoId"
          element={<VideoPlayer videos={videos} isOpen={isOpen} />}
        />
      </Routes>
    </div>
  );
}

export default App;
