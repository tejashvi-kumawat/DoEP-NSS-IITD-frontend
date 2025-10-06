// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Registration';
import VolunteerRegister from './pages/VolunteerRegister';
import Navbar from './components/Navbar';
import Projects from './pages/Projects';
import GetInvolved from './pages/GetInvolved';
import Contact from './pages/Contact';
import Footer from './components/Footer';

const App = () => {
  return (
    <Router>
      <Navbar/>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/get-involved" element={<GetInvolved />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register/>} />
          <Route path="/volunteer-register" element = {<VolunteerRegister/>} />
        </Routes>
      </div>
      <Footer />

    </Router>
  );
};

export default App;
