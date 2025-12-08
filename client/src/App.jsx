import { useState } from 'react'
import './App.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import the pages and components we are about to build
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ProjectGallery from './pages/ProjectGallery';
import SubmitProject from './pages/SubmitProject';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminDashboard from './pages/AdminDashboard';
import About from './pages/About';
import Footer from './components/Footer';

function App() {
    return (
        <Router>
            {/* Navbar is outside the Routes so it appears on every page */}
            <Navbar />
            {/* pt-28 adds extra breathing room below the fixed navbar (h-20) */}
            <main className="pt-28 min-h-screen bg-gray-50 flex flex-col">
                <Routes>
                    {/* Define the paths for your simple website */}
                    <Route path="/" element={<HomePage />} />
                    <Route path="/projects" element={<ProjectGallery />} />
                    <Route path="/submit" element={<SubmitProject />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/about" element={<About />} />
                </Routes>
                <Footer />
            </main>
        </Router>
    );
}
export default App;