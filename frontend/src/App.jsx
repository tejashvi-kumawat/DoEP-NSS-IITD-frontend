// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Registration';
import VolunteerRegister from './pages/VolunteerRegister';
import Navbar from './components/Navbar';
const App = () => {
  return (
    <Router>
      <Navbar/>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register/>} />
          <Route path="/volunteer-register" element = {<VolunteerRegister/>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
