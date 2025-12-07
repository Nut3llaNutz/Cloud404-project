// client/src/components/Navbar.jsx
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        // Fixed, sticky navigation bar
        <nav className="fixed w-full z-10 bg-white shadow-lg">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
                {/* Brand/Logo */}
                <Link to="/" className="text-xl font-bold text-indigo-700 hover:text-indigo-900 transition">
                    🇮🇳 Swadeshi Innovation Hub
                </Link>

                {/* Navigation Links */}
                <div className="space-x-4">
                    <Link to="/projects" className="text-gray-600 hover:text-indigo-700 transition font-medium">
                        Projects Gallery
                    </Link>
                    {/* Call-to-action button */}
                    <Link to="/submit" className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition">
                        Submit Idea
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;