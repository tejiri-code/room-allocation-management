import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Allocation from './Allocation';
import Login from './Login';
import Home from './Home';

function App() {
  return (
   
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/allocation" element={<Allocation />} />
      </Routes>
   
  );
}

export default App;
