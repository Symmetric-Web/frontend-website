import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import NetworkingSolutions from './pages/NetworkingSolutions';
import BuildingTechnologies from './pages/BuildingTechnologies';
import AudioVisual from './pages/AudioVisual';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/networking" element={<NetworkingSolutions />} />
          <Route path="/building-tech" element={<BuildingTechnologies />} />
          <Route path="/audio-visual" element={<AudioVisual />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
