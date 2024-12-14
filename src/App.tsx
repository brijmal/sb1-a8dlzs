import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Welcome from './components/Welcome';
import Survey from './components/Survey';
import ThankYou from './components/ThankYou';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/survey" element={<Survey />} />
        <Route path="/thank-you" element={<ThankYou />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;