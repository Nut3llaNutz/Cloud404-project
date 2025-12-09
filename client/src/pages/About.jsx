import React from 'react';

const About = () => {
    return (
        <div className="container mx-auto p-8 rainbow-bg min-h-screen pt-24">
            <div className="max-w-4xl mx-auto bg-white/50 backdrop-blur-sm p-10 rounded-2xl shadow-xl">
                <h1 className="text-5xl font-extrabold text-indigo-700 mb-8 border-indigo-100 pb-4">
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
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Meet the Team</h2>
                    <div className="flex flex-wrap justify-center gap-10">
                        {['YUVRAJ', 'AKHILA', 'ADNAN'].map((name, index) => (
                            <div key={index} className="text-center group">
                                <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full mx-auto mb-3 flex items-center justify-center text-white text-3xl font-bold shadow-lg transform group-hover:scale-110 transition duration-300">
                                    {name.charAt(0)}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 tracking-wide">{name}</h3>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default About;
