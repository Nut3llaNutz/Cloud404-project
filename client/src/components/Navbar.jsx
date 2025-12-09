import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import projectLogo from '../project-logo.png';

const Navbar = () => {
    const { isLoggedIn, user, logout } = useUser();
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const isActive = (path) => location.pathname === path ? 'text-indigo-600 font-bold' : 'text-gray-600 hover:text-indigo-600';

    return (
        <nav className="fixed w-full z-20 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100">
            <div className="w-full px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">

                    {/* LOGO */}
                    <Link to="/" className="flex items-center hover:scale-105 transition duration-300">
                        <img src={projectLogo} alt="SwadeshiHub Logo" className="h-20 w-auto" />
                    </Link>

                    {/* DESKTOP MENU */}
                    <div className="hidden lg:flex space-x-8 items-center bg-gray-100 px-8 py-2 rounded-full border border-gray-100 shadow-inner">
                        <Link to="/projects" className={`transition font-medium text-sm ${isActive('/projects')}`}>Gallery</Link>
                        <Link to="/robotics" className={`transition font-medium text-sm ${isActive('/robotics')}`}>Robotics</Link>
                        <Link to="/drones" className={`transition font-medium text-sm ${isActive('/drones')}`}>Drones</Link>
                        <Link to="/about" className={`transition font-medium text-sm ${isActive('/about')}`}>About</Link>
                        <Link to="/contact" className={`transition font-medium text-sm ${isActive('/contact')}`}>Contact</Link>
                    </div>

                    {/* ACTION BUTTONS */}
                    <div className="hidden lg:flex items-center space-x-4">
                        {isLoggedIn ? (
                            <>
                                {user?.role === 'admin' && (
                                    <Link to="/admin" className="px-4 py-2 bg-gradient-to-r from-gray-800 to-black text-white rounded-full text-xs font-bold hover:shadow-lg hover:-translate-y-0.5 transition flex items-center gap-2">
                                        <span>🛡️</span> Admin
                                    </Link>
                                )}
                                <Link to="/dashboard" className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 transition">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white flex items-center justify-center font-bold text-xs">
                                        {user?.username?.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="text-sm font-semibold">{user?.username}</span>
                                </Link>
                                <button onClick={() => { logout(); setIsOpen(false); navigate('/'); }} className="px-4 py-2 border border-red-200 text-red-500 rounded-full hover:bg-red-50 transition text-sm font-semibold">
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className={`transition font-medium text-sm ${isActive('/login')}`}>Login</Link>
                                <Link to="/signup" className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition text-sm font-bold">
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>

                    {/* MOBILE MENU BUTTON */}
                    <div className="lg:hidden flex items-center">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 hover:text-gray-900 focus:outline-none">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* MOBILE DROPDOWN */}
            {isOpen && (
                <div className="lg:hidden bg-white border-t border-gray-100 shadow-xl absolute w-full left-0 top-20 transition-all duration-300 ease-in-out">
                    <div className="flex flex-col space-y-2 p-4">
                        <Link to="/projects" onClick={() => setIsOpen(false)} className={`block px-4 py-2 rounded-md ${isActive('/projects')}`}>Gallery</Link>
                        <Link to="/robotics" onClick={() => setIsOpen(false)} className={`block px-4 py-2 rounded-md ${isActive('/robotics')}`}>Robotics</Link>
                        <Link to="/about" onClick={() => setIsOpen(false)} className={`block px-4 py-2 rounded-md ${isActive('/about')}`}>About</Link>
                        <Link to="/contact" onClick={() => setIsOpen(false)} className={`block px-4 py-2 rounded-md ${isActive('/contact')}`}>Contact</Link>

                        <div className="border-t border-gray-100 my-2 pt-2">
                            {isLoggedIn ? (
                                <>
                                    <div className="px-4 py-2 text-gray-500 text-sm">Signed in as <span className="font-bold">{user?.username}</span></div>
                                    {user?.role === 'admin' && (
                                        <Link to="/admin" onClick={() => setIsOpen(false)} className="block px-4 py-2 text-gray-800 font-bold hover:bg-gray-100 rounded-md">
                                            🛡️ Admin Panel
                                        </Link>
                                    )}
                                    <Link to="/submit" onClick={() => setIsOpen(false)} className="block w-full text-left px-4 py-2 text-green-600 font-medium hover:bg-green-50 rounded-md">
                                        + Submit Idea
                                    </Link>
                                    <button onClick={() => { logout(); setIsOpen(false); }} className="block w-full text-left px-4 py-2 text-red-600 font-medium hover:bg-red-50 rounded-md">
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" onClick={() => setIsOpen(false)} className="block px-4 py-2 text-gray-600 hover:text-indigo-600 rounded-md">Login</Link>
                                    <Link to="/signup" onClick={() => setIsOpen(false)} className="block px-4 py-2 text-indigo-600 font-bold hover:bg-indigo-50 rounded-md">Register</Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;