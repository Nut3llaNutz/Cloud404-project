import React from 'react';

const About = () => {
    return (
        <div className="container mx-auto p-8 bg-gray-50 min-h-screen">
            <div className="max-w-4xl mx-auto bg-white p-10 rounded-2xl shadow-xl">
                <h1 className="text-5xl font-extrabold text-indigo-700 mb-8 border-b-2 border-indigo-100 pb-4">
                    About Us
                </h1>

                <section className="mb-8">
                    <p className="text-xl text-gray-700 leading-relaxed">
                        Welcome to the <span className="font-bold text-indigo-600">Swadeshi Innovation Hub</span>.
                        Our mission is to provide a platform for India's brightest minds to showcase their
                        innovations in Robotics, Agriculture, Defense, and Healthcare.
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Vision</h2>
                    <div className="bg-indigo-50 p-6 rounded-lg border-l-4 border-indigo-500">
                        <p className="text-lg text-gray-700 italic">
                            "To empower indigenous technology and foster a culture of self-reliance (Atmanirbhar Bharat)
                            by connecting innovators with the world."
                        </p>
                    </div>
                </section>

                <section>
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Meet the Team</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center p-4 border rounded-xl hover:shadow-lg transition">
                            <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-3"></div>
                            <h3 className="text-xl font-bold text-gray-900">Person 1</h3>
                            <p className="text-indigo-500 font-medium">Frontend Lead</p>
                        </div>
                        <div className="text-center p-4 border rounded-xl hover:shadow-lg transition">
                            <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-3"></div>
                            <h3 className="text-xl font-bold text-gray-900">Person 2</h3>
                            <p className="text-indigo-500 font-medium">Robotics Specialist</p>
                        </div>
                        <div className="text-center p-4 border rounded-xl hover:shadow-lg transition">
                            <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-3"></div>
                            <h3 className="text-xl font-bold text-gray-900">Person 3</h3>
                            <p className="text-indigo-500 font-medium">Auth & Drones</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default About;
