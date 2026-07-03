// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./assets/Pages/Home";
import Courses from "./assets/Pages/Courses";
import Login from "./assets/Pages/Login";
import Donate from "./assets/Pages/Donate";
import Dashboard from "./assets/Pages/Dashboard";
import Workspace from "./assets/Pages/Workspace";
import AdminPanel from "./assets/Pages/AdminPanel";
import Radio from "./assets/components/Radio";
import Header from "./assets/components/Header";
import Footer from "./assets/components/Footer";
import "./index.css";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="bg">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/login" element={<Login />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/Radio" element={<Radio/>}/>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/workspace/:tech/:projectId/:milestoneId" element={<Workspace />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
