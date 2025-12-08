// client/src/components/Navbar.jsx
import React from 'react'; // Import React for useState
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext'; // Import context

const Navbar = () => {
    const { isLoggedIn, user, logout } = useUser();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    // Close menu when route changes
    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <nav className="fixed top-0 left-0 w-full z-50 glass border-b border-white/20 shadow-sm transition-all duration-300">
            <div className="max-w-7xl mx-auto px-6 h-20 grid grid-cols-2 md:grid-cols-3 items-center">

                {/* LEFT: Branding */}
                <div className="flex justify-start">
                    <Link to="/" className="text-2xl font-extrabold flex items-center gap-2 group">
                        <span className="text-3xl group-hover:scale-110 transition-transform duration-300">🇮🇳</span>
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-purple-600 tracking-tight">Swadeshi Hub</span>
                    </Link>
                </div>

                {/* CENTER: Navigation Links (Desktop Only) */}
                <div className="hidden md:flex justify-center space-x-8">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/projects">Gallery</NavLink>
                    <NavLink to="/about">About Us</NavLink>
                </div>

                {/* RIGHT: User Actions (Desktop Only) */}
                <div className="hidden md:flex justify-end items-center gap-4">
                    {isLoggedIn ? (
                        <>
                            {user?.role === 'admin' && (
                                <Link to="/admin" className="text-xs font-bold text-red-600 uppercase tracking-wider border border-red-200 px-2 py-1 rounded bg-red-50 hover:bg-red-100 transition">
                                    Admin
                                </Link>
                            )}

                            <div className="flex items-center gap-3 pl-4 border-l border-gray-300">
                                <span className="text-sm font-semibold text-gray-700">{user?.username}</span>

                                <Link to="/submit" className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-lg hover:shadow-indigo-500/30 hover:scale-105 transition-all" title="Submit Project">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                </Link>

                                <button onClick={logout} className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-gray-100" title="Logout">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link to="/login" className="text-gray-600 font-medium hover:text-indigo-600 transition">Login</Link>
                            <Link to="/signup" className="px-5 py-2 rounded-full bg-gray-900 text-white text-sm font-bold shadow-lg hover:bg-gray-800 hover:-translate-y-0.5 transition-all">
                                Join Now
                            </Link>
                        </div>
                    )}
                </div>

                {/* MOBILE MENU BUTTON (Right Aligned on Mobile) */}
                <div className="flex justify-end md:hidden">
                    <button onClick={toggleMenu} className="text-gray-700 focus:outline-none">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* MOBILE MENU DROPDOWN */}
            {isMenuOpen && (
                <div className="md:hidden glass border-t border-white/20 absolute w-full">
                    <div className="px-4 pt-2 pb-6 space-y-2">
                        <MobileNavLink to="/" onClick={toggleMenu}>Home</MobileNavLink>
                        <MobileNavLink to="/projects" onClick={toggleMenu}>Gallery</MobileNavLink>
                        <MobileNavLink to="/about" onClick={toggleMenu}>About Us</MobileNavLink>

                        <div className="pt-4 mt-4 border-t border-gray-200">
                            {isLoggedIn ? (
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-800 font-semibold">Hi, {user?.username}</span>
                                        {user?.role === 'admin' && (
                                            <Link to="/admin" onClick={toggleMenu} className="text-xs font-bold text-red-600 uppercase border border-red-200 px-2 py-1 rounded bg-red-50">
                                                Admin Panel
                                            </Link>
                                        )}
                                    </div>
                                    <Link to="/submit" onClick={toggleMenu} className="block w-full text-center py-2 bg-indigo-600 text-white rounded-lg font-semibold shadow-md">
                                        Submit New Idea
                                    </Link>
                                    <button onClick={() => { logout(); toggleMenu(); }} className="block w-full text-center py-2 border border-red-200 text-red-600 rounded-lg font-semibold hover:bg-red-50">
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 gap-4">
                                    <Link to="/login" onClick={toggleMenu} className="block w-full text-center py-2 border border-gray-300 rounded-lg text-gray-700 font-semibold">
                                        Login
                                    </Link>
                                    <Link to="/signup" onClick={toggleMenu} className="block w-full text-center py-2 bg-gray-900 text-white rounded-lg font-bold shadow-md">
                                        Join Now
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
};

// Helper Component for styling links
const NavLink = ({ to, children }) => (
    <Link
        to={to}
        className="relative text-gray-600 font-medium text-base hover:text-indigo-600 transition-colors duration-300 group py-2"
    >
        {children}
        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-600 transition-all duration-300 group-hover:w-full"></span>
    </Link>
);

const MobileNavLink = ({ to, children, onClick }) => (
    <Link
        to={to}
        onClick={onClick}
        className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-700 hover:bg-indigo-50 transition"
    >
        {children}
    </Link>
);

export default Navbar;