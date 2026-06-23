import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-white pt-16 pb-8 border-t border-slate-800 relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    
                    {/* Brand & Address */}
                    <div>
                        <h3 className="text-2xl font-bold mb-4 tracking-tight">Velora Rentals</h3>
                        <p className="text-slate-400 mb-6 max-w-sm">
                            Markapur, Adarsha Apartments, Sai Nagar, Jawahar Nagar Colony, 
                            Opposite to Hero Honda Showroom, Andhra Pradesh.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-600 transition-colors">
                                <img src="/src/assets/facebook_logo.svg" alt="Facebook" className="w-5 h-5 invert" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-600 transition-colors">
                                <img src="/src/assets/instagram_logo.svg" alt="Instagram" className="w-5 h-5 invert" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-600 transition-colors">
                                <img src="/src/assets/twitter_logo.svg" alt="Twitter" className="w-5 h-5 invert" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-white">Quick Links</h4>
                        <ul className="space-y-3">
                            <li><Link to="/" className="text-slate-400 hover:text-indigo-400 transition-colors">Home</Link></li>
                            <li><Link to="/cars" className="text-slate-400 hover:text-indigo-400 transition-colors">Explore Cars</Link></li>
                            <li><Link to="/my-bookings" className="text-slate-400 hover:text-indigo-400 transition-colors">My Bookings</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-white">Contact Us</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <i className="ri-user-line text-indigo-400 text-xl"></i>
                                <div>
                                    <p className="font-medium text-white">Proprietor</p>
                                    <p className="text-slate-400">Rupesh</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <i className="ri-phone-line text-indigo-400 text-xl"></i>
                                <div>
                                    <p className="font-medium text-white">Phone & WhatsApp</p>
                                    <a href="tel:+918500617107" className="text-slate-400 hover:text-indigo-400 block">+91 8500617107</a>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <i className="ri-time-line text-indigo-400 text-xl"></i>
                                <div>
                                    <p className="font-medium text-white">Availability</p>
                                    <p className="text-slate-400">24/7 Service</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-800 text-center flex flex-col md:flex-row justify-between items-center">
                    <p className="text-slate-500 mb-4 md:mb-0">
                        &copy; {new Date().getFullYear()} Velora Car Rentals. All rights reserved.
                    </p>
                    <p className="text-slate-500 text-sm">
                        Designed for seamless travel in Markapur.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
