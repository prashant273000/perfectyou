import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Hairstyle from './pages/Hairstyle';
import Pimples from './pages/Pimples';
import Moustache from './pages/Moustache';
import Spectacles from './pages/Spectacles';
import Hair from './pages/Hair';
import Clothing from './pages/Clothing';
import Fitness from './pages/Fitness';
import Diet from './pages/Diet';
import Disease from './pages/Disease';
import Confidence from './pages/Confidence';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8">
          <Routes>
            <Route path="/" element={<Navigate to="/hairstyle" />} />
            <Route path="/hairstyle" element={<Hairstyle />} />
            <Route path="/pimples" element={<Pimples />} />
            <Route path="/moustache" element={<Moustache />} />
            <Route path="/spectacles" element={<Spectacles />} />
            <Route path="/hair" element={<Hair />} />
            <Route path="/clothing" element={<Clothing />} />
            <Route path="/fitness" element={<Fitness />} />
            <Route path="/diet" element={<Diet />} />
            <Route path="/disease" element={<Disease />} />
            <Route path="/confidence" element={<Confidence />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;