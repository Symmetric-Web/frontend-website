import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import NetworkingProducts from './pages/NetworkingProducts';
import BuildingTechnologies from './pages/BuildingTechnologies';
import AudioVisual from './pages/AudioVisual';
import Contact from './pages/Contact';
import Solutions from './pages/Solutions';
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
          <Route path="/networking" element={<NetworkingProducts />} />
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
