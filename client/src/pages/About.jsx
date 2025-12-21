import React from 'react';

const About = () => {
    return (
        <div className="purplish-bg min-h-screen pt-24">
            <div className="container mx-auto p-4 md:p-8">
                <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-md p-8 md:p-12 rounded-3xl shadow-2xl border border-white/10">
                    <h1 className="text-5xl font-extrabold text-white mb-8 border-b border-white/10 pb-6 tracking-tight">
                        About Us
                    </h1>

                    <section className="mb-10">
                        <p className="text-xl text-gray-200 leading-relaxed font-light">
                            Welcome to the <span className="font-semibold text-indigo-400">Swadeshi Innovation Hub</span>.
                            Our mission is to provide a platform for India's brightest minds to showcase their
                            innovations in Robotics, Agriculture, Defense, and Healthcare.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="text-2xl font-bold text-white mb-6 tracking-wide uppercase text-sm opacity-80">Our Vision</h2>
                        <div className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 p-8 rounded-xl border-l-4 border-indigo-500 shadow-lg">
                            <p className="text-lg text-gray-200 italic font-medium leading-loose">
                                "To empower indigenous technology and foster a culture of self-reliance (Atmanirbhar Bharat)
                                by connecting innovators with the world."
                            </p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-10 text-center tracking-wide uppercase text-sm opacity-80">Meet the Team</h2>
                        <div className="flex flex-wrap justify-center gap-12">
                            {['YUVRAJ', 'AKHILA', 'ADNAN'].map((name, index) => (
                                <div key={index} className="text-center group">
                                    <div className="w-24 h-24 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold shadow-2xl ring-4 ring-white/10 group-hover:ring-indigo-500 transition-all duration-300 transform group-hover:scale-110">
                                        {name.charAt(0)}
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-100 tracking-wider">{name}</h3>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default About;
