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
import RoboticsList from './pages/RoboticsList';
import RoboticsDetail from './pages/RoboticsDetail';
import AddRobotics from './pages/AddRobotics';
import DroneList from './pages/DroneList';
import DroneDetail from './pages/DroneDetail';
import AddDrone from './pages/AddDrone';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import About from './pages/About';
import Contact from './pages/Contact';
import Footer from './components/Footer';

function App() {
    return (
        <Router>
            {/* Navbar is outside the Routes so it appears on every page */}
            <Navbar />
            {/* pt-16 ensures content starts below the fixed navbar */}
            <main className="pt-20 min-h-screen bg-gray-50">
                <Routes>
                    {/* Define the paths for your simple website */}
                    <Route path="/" element={<HomePage />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/admin" element={<AdminDashboard />} />
                    <Route path="/projects" element={<ProjectGallery />} />
                    <Route path="/submit" element={<SubmitProject />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />

                    {/* Robotics Routes */}
                    <Route path="/robotics" element={<RoboticsList />} />
                    <Route path="/robotics/:id" element={<RoboticsDetail />} />
                    <Route path="/add-robotics" element={<AddRobotics />} />

                    {/* Drone Routes */}
                    <Route path="/drones" element={<DroneList />} />
                    <Route path="/drones/:id" element={<DroneDetail />} />
                    <Route path="/add-drone" element={<AddDrone />} />

                    {/* General Pages */}
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes>
            </main>
            <Footer />
        </Router>
    );
}
export default App;