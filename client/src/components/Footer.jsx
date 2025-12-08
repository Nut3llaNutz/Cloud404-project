import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="glass border-t border-white/20 mt-auto pt-10 pb-6 text-gray-800 relative z-10">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* Brand */}
                    <div>
                        <h3 className="text-2xl font-bold text-indigo-800 mb-4">🇮🇳 Swadeshi Tech Hub</h3>
                        <p className="text-gray-600">
                            Empowering student innovators to build a self-reliant India through technology and creativity.
                        </p>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><Link to="/" className="text-gray-600 hover:text-indigo-600 transition">Home</Link></li>
                            <li><Link to="/projects" className="text-gray-600 hover:text-indigo-600 transition">Gallery</Link></li>
                            <li><Link to="/about" className="text-gray-600 hover:text-indigo-600 transition">About Us</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Contact</h4>
                        <p className="text-gray-600">Lovely Professional University</p>
                        <p className="text-gray-600">Phagwara, Punjab, India</p>
                        <p className="text-gray-600 mt-2">Email: yuvrajbhardwaj2005yb@gmail.com</p>
                    </div>
                </div>

                <div className="border-t border-gray-300 pt-6 text-center text-sm text-gray-500">
                    &copy; {new Date().getFullYear()} Swadeshi Innovation. Made with ❤️ for Atmanirbhar Bharat.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
