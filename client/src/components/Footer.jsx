import React from 'react';
import { Link } from 'react-router-dom';
import projectLogo from '../project-logo.png';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white pt-12 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <Link to="/" className="inline-block hover:scale-105 transition duration-300">
                            <img src={projectLogo} alt="SwadeshiHub Logo" className="h-25 w-auto bg-white rounded-full p-2" />
                        </Link>
                        <p className="mt-4 text-gray-400 max-w-sm">
                            Empowering India's innovators to build the future. A central registry for Robotics, Drones, and cutting-edge technology projects.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-bold mb-4 text-indigo-400">Platform</h3>
                        <ul className="space-y-2">
                            <li><Link to="/projects" className="text-gray-400 hover:text-white transition">Full Gallery</Link></li>
                            <li><Link to="/robotics" className="text-gray-400 hover:text-white transition">Robotics Wing</Link></li>
                            <li><Link to="/drones" className="text-gray-400 hover:text-white transition">Drone Hangar</Link></li>
                            <li><Link to="/submit" className="text-gray-400 hover:text-white transition">Submit Idea</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-lg font-bold mb-4 text-green-400">Support</h3>
                        <ul className="space-y-2">
                            <li><Link to="/about" className="text-gray-400 hover:text-white transition">About Us</Link></li>
                            <li><Link to="/contact" className="text-gray-400 hover:text-white transition">Contact</Link></li>
                            <li><Link to="/login" className="text-gray-400 hover:text-white transition">Login / Register</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-500 text-sm">
                        © {new Date().getFullYear()} Swadeshi Innovation Hub. Built for Atmanirbhar Bharat.
                    </p>
                    <div className="flex space-x-4 mt-4 md:mt-0">
                        <a href="https://www.lpu.in" className="text-gray-400 hover:text-white transition"><i className="fab fa-linkedin"></i>Made By LPU Students 🥜</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
