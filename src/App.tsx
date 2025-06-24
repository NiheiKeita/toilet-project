import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ToiletSelection from './pages/ToiletSelection';
import ToiletStall from './pages/ToiletStall';
import CompletePage from './pages/CompletePage';
import SpringPage from './pages/SpringPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/toilet" element={<ToiletSelection />} />
          <Route path="/toilet/:stallId" element={<ToiletStall />} />
          <Route path="/complete" element={<CompletePage />} />
          <Route path="/spring" element={<SpringPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;