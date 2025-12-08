// client/src/components/Navbar.jsx
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext'; // Import context

const Navbar = () => {
    const { isLoggedIn, user, logout } = useUser(); // Get auth state and logout function

    return (
        <nav className="fixed w-full z-20 glass border-b border-white/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
                <Link to="/" className="text-2xl font-extrabold text-indigo-700 hover:text-indigo-900 transition flex items-center gap-2">
                    <span className="text-3xl">🇮🇳</span>
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 to-purple-600">Swadeshi Hub</span>
                </Link>

                <div className="space-x-6 flex items-center">
                    <Link to="/projects" className="text-gray-700 hover:text-indigo-700 transition font-medium text-lg">
                        Gallery
                    </Link>
                    <Link to="/about" className="text-gray-700 hover:text-indigo-700 transition font-medium text-lg">
                        About
                    </Link>

                    {isLoggedIn ? (
                        // --- SHOW WHEN LOGGED IN ---
                        <>
                            {user?.role === 'admin' && (
                                <Link to="/admin" className="text-red-600 font-bold hover:text-red-800 transition">
                                    Admin Panel
                                </Link>
                            )}
                            <div className="flex items-center gap-4 bg-white/50 px-4 py-2 rounded-full border border-white/40 shadow-sm">
                                <span className="text-gray-800 font-semibold">{user?.username}</span>
                                <Link to="/submit" className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5">
                                    + Submit Idea
                                </Link>
                                <button onClick={logout} className="text-gray-500 hover:text-red-500 transition">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                </button>
                            </div>
                        </>
                    ) : (
                        // --- SHOW WHEN LOGGED OUT ---
                        <>
                            <Link to="/login" className="text-gray-700 hover:text-indigo-700 transition font-medium text-lg">
                                Login
                            </Link>
                            <Link to="/signup" className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5 font-bold">
                                Join Now
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;