import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Allocation from './allocation';
import Login from './Login';
import Home from './Home';
import ReservationList from './reservtionList';

function App() {
      
  return (
   
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/allocation" element={<Allocation />} />
        <Route path="/reservationList" element={<ReservationList />} />
      </Routes>
   
  );
}

export default App;
