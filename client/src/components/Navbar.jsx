// client/src/components/Navbar.jsx
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext'; // Import context

const Navbar = () => {
    const { isLoggedIn, user, logout } = useUser();

    return (
        <nav className="fixed top-0 left-0 w-full z-50 glass border-b border-white/20 shadow-sm transition-all duration-300">
            <div className="max-w-7xl mx-auto px-6 h-20 grid grid-cols-3 items-center">

                {/* LEFT: Branding */}
                <div className="flex justify-start">
                    <Link to="/" className="text-2xl font-extrabold flex items-center gap-2 group">
                        <span className="text-3xl group-hover:scale-110 transition-transform duration-300">🇮🇳</span>
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-purple-600 tracking-tight">Swadeshi Hub</span>
                    </Link>
                </div>

                {/* CENTER: Navigation Links */}
                <div className="flex justify-center space-x-8">
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/projects">Gallery</NavLink>
                    <NavLink to="/about">About Us</NavLink>
                </div>

                {/* RIGHT: User Actions */}
                <div className="flex justify-end items-center gap-4">
                    {isLoggedIn ? (
                        <>
                            {user?.role === 'admin' && (
                                <Link to="/admin" className="hidden md:block text-xs font-bold text-red-600 uppercase tracking-wider border border-red-200 px-2 py-1 rounded bg-red-50 hover:bg-red-100 transition">
                                    Admin
                                </Link>
                            )}

                            <div className="flex items-center gap-3 pl-4 border-l border-gray-300">
                                <span className="hidden md:block text-sm font-semibold text-gray-700">{user?.username}</span>

                                <Link to="/submit" className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-lg hover:shadow-indigo-500/30 hover:scale-105 transition-all" title="Submit Project">
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
            </div>
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

export default Navbar;