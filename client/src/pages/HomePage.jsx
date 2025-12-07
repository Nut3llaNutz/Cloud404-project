// client/src/pages/HomePage.jsx
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div className="text-center pt-24 pb-16 bg-white min-h-screen">
            <div className="container mx-auto px-4">
                <h1 className="text-6xl font-extrabold text-gray-900 mb-4">
                    <span className="text-indigo-600">Swadeshi</span> for <span className="text-green-600">Atmanirbhar Bharat</span>
                </h1>
                <p className="text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
                    A national registry showcasing India's next generation of Robotics and Drone innovation by students and entrepreneurs.
                </p>

                {/* Action Button */}
                <Link 
                    to="/projects" 
                    className="inline-block px-8 py-3 text-xl font-semibold text-white bg-indigo-600 rounded-full hover:bg-indigo-700 transition shadow-lg transform hover:scale-105"
                >
                    Explore 🚀 Projects
                </Link>
            </div>

            {/* Optional Image/Placeholder for visual appeal */}
            <div className="mt-16 w-full max-w-4xl mx-auto">
                {/* This is where you might describe the types of robots/drones */}
                <p className="text-lg text-gray-500">Categories include Agriculture, Defense, Healthcare, and Education.</p>
            </div>
        </div>
    );
};

export default HomePage;