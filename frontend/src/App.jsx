// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import Login from "./pages/Login";
import Donate from "./pages/Donate";
import Dashboard from "./pages/Dashboard";
import Workspace from "./pages/Workspace";
import Admin from "./pages/Admin";
import Radio from "./assets/components/Radio";
import Header from "./assets/components/Header";
import Footer from "./assets/components/Footer";
import ToastContainer from "./assets/components/ToastContainer";
import "./index.css";
import "./App.css";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="bg">
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/courses/:courseId" element={<CourseDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/donate" element={<Donate />} />
              <Route path="/Radio" element={<Radio/>}/>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/workspace/:tech/:projectId/:milestoneId" element={<Workspace />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
            <Footer />
            <ToastContainer />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
