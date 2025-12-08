// client/src/components/Navbar.jsx
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext'; // Import context

const Navbar = () => {
const { isLoggedIn, user, logout } = useUser(); // Get auth state and logout function

    return (
        <nav className="fixed w-full z-10 bg-white shadow-lg">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
                <Link to="/" className="text-xl font-bold text-indigo-700 hover:text-indigo-900 transition">
                    🇮🇳 Swadeshi Innovation Hub
                </Link>

                <div className="space-x-4 flex items-center">
                    <Link to="/projects" className="text-gray-600 hover:text-indigo-700 transition font-medium">
                        Gallery
                    </Link>

                    {isLoggedIn ? (
                        // --- SHOW WHEN LOGGED IN ---
                        <>
                            <span className="text-gray-700 font-medium">Hello, {user?.username}</span>

                            <Link to="/submit" className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition">
                                Submit Idea
                            </Link>
                            <button onClick={logout} className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition">
                                Logout
                            </button>
                        </>
                    ) : (
                        // --- SHOW WHEN LOGGED OUT ---
                        <>
                            <Link to="/login" className="text-gray-600 hover:text-indigo-700 transition font-medium">
                                Login
                            </Link>
                            <Link to="/signup" className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition">
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;