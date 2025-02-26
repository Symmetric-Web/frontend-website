import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Solutions from './pages/Solutions';
import Home from './pages/Home';
import About from './pages/About';
import NetworkingSolutions from './pages/NetworkingSolutions';
import BuildingTechnologies from './pages/BuildingTechnologies';
import AudioVisual from './pages/AudioVisual';
import Contact from './pages/Contact';
import CaseStudy from './pages/CaseStudy';
import Blog from './pages/Blog';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/networking" element={<NetworkingSolutions />} />
          <Route path="/building-tech" element={<BuildingTechnologies />} />
          <Route path="/audio-visual" element={<AudioVisual />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/case-study" element={<CaseStudy />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
