import React from 'react';

const About = () => {
    return (
        <div className="min-h-screen bg-white">
            <div className="container mx-auto px-6 py-20">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-6">About Swadeshi Innovation</h1>
                    <p className="text-xl text-gray-600 leading-relaxed">
                        Fostering a culture of innovation and self-reliance among Indian students to build the technologies of tomorrow.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
                    <div className="order-2 md:order-1">
                        <h2 className="text-3xl font-bold text-indigo-700 mb-4">Our Mission</h2>
                        <p className="text-gray-700 mb-4 text-lg">
                            We believe that true self-reliance (Atmanirbhar Bharat) begins with indigenous innovation.
                            Our mission is to provide a platform for students to showcase their creativity in two critical sectors:
                            <span className="font-bold text-indigo-600"> Robotics and Drones</span>.
                        </p>
                        <p className="text-gray-700 text-lg">
                            By connecting young innovators with a wider audience, we aim to bridge the gap between
                            academic projects and real-world solutions.
                        </p>
                    </div>
                    <div className="order-1 md:order-2 bg-indigo-50 rounded-2xl p-10 flex items-center justify-center">
                        <span className="text-9xl">🚀</span>
                    </div>
                </div>

                <div className="bg-gray-50 rounded-3xl p-12 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">Meet the Initiative</h2>
                    <div className="flex flex-col md:flex-row justify-center gap-10">
                        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition">
                            <div className="w-24 h-24 bg-indigo-100 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl">👨‍🎓</div>
                            <h3 className="text-xl font-bold text-gray-800">For Students</h3>
                            <p className="text-gray-600 mt-2">A stage to present your hard work and get recognized.</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition">
                            <div className="w-24 h-24 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl">🌍</div>
                            <h3 className="text-xl font-bold text-gray-800">For the Nation</h3>
                            <p className="text-gray-600 mt-2">Reducing import dependence by promoting local tech.</p>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition">
                            <div className="w-24 h-24 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl">🤝</div>
                            <h3 className="text-xl font-bold text-gray-800">Collaboration</h3>
                            <p className="text-gray-600 mt-2">Connecting mentors, peers, and industry leaders.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
