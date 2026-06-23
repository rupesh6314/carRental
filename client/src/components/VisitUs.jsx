import React from 'react';

const VisitUs = () => {
    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl uppercase tracking-wider">
                        VISIT US
                    </h2>
                    <p className="mt-4 text-lg text-slate-500">
                        We are conveniently located in Markapur, Andhra Pradesh.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    {/* Google Map */}
                    <div className="w-full h-96 lg:h-full min-h-[400px] rounded-xl overflow-hidden shadow-lg border border-slate-200">
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15331.411130635955!2d79.2612711!3d15.7335756!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4a9f3b55555555%3A0x1234567890abcdef!2sMarkapur%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin" 
                            width="100%" 
                            height="100%" 
                            style={{ border: 0 }} 
                            allowFullScreen="" 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Markapur Location Map"
                            className="w-full h-full object-cover"
                        ></iframe>
                    </div>

                    {/* Business Information Box */}
                    <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8">
                        <div className="flex items-center space-x-3 mb-6">
                            <i className="ri-map-pin-2-fill text-2xl text-indigo-600"></i>
                            <div>
                                <h3 className="text-xl font-bold text-slate-900">Markapur Car Travels</h3>
                                <p className="text-slate-500 text-sm">Markapur, Adarsha Apartments, Sai Nagar, Jawahar Nagar Colony, Opposite to Hero honda Showroom - 523316, Andhra Pradesh, India</p>
                            </div>
                        </div>

                        <a 
                            href="https://goo.gl/maps/DTnhKNxumg21C2eG9?g_st=ac" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-block bg-indigo-500 hover:bg-indigo-600 text-white font-medium px-6 py-2.5 rounded-lg mb-8 transition-colors"
                        >
                            Get Directions
                        </a>

                        <h4 className="text-lg font-bold text-slate-900 mb-4 border-b pb-2">Business Information</h4>
                        
                        <ul className="space-y-4">
                            <li className="flex flex-col sm:flex-row sm:items-center">
                                <span className="font-semibold text-slate-900 w-32 shrink-0">Proprietor:</span>
                                <span className="text-slate-600">Rupesh</span>
                            </li>
                            <li className="flex flex-col sm:flex-row sm:items-center">
                                <span className="font-semibold text-slate-900 w-32 shrink-0">Services:</span>
                                <span className="text-slate-600">Self-Drive Cars & Car Rentals</span>
                            </li>
                            <li className="flex flex-col sm:flex-row sm:items-center">
                                <span className="font-semibold text-slate-900 w-32 shrink-0">Availability:</span>
                                <span className="text-slate-600">24/7 Service</span>
                            </li>
                            <li className="flex flex-col sm:flex-row sm:items-center">
                                <span className="font-semibold text-slate-900 w-32 shrink-0">Phone:</span>
                                <a href="tel:+918500617107" className="text-indigo-600 hover:text-indigo-800 transition-colors">+91 8500617107</a>
                            </li>
                            <li className="flex flex-col sm:flex-row sm:items-center">
                                <span className="font-semibold text-slate-900 w-32 shrink-0">WhatsApp:</span>
                                <a href="https://wa.me/918500617107" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-800 underline transition-colors">Chat on WhatsApp</a>
                            </li>
                            <li className="flex flex-col sm:flex-row sm:items-center">
                                <span className="font-semibold text-slate-900 w-32 shrink-0">Usage:</span>
                                <span className="text-slate-600">Local travel, outstation trips, personal use</span>
                            </li>
                            <li className="flex flex-col sm:flex-row sm:items-center">
                                <span className="font-semibold text-slate-900 w-32 shrink-0">Languages:</span>
                                <span className="text-slate-600">English, Telugu, Hindi</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default VisitUs;
