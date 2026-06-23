import React from 'react';
import telephoneLogo from '../assets/telephone_logo.jpeg';

const FloatingCallButton = () => {
    return (
        <a 
            href="tel:+918500617107"
            className="fixed bottom-6 left-6 z-[100] w-14 h-14 rounded-full overflow-hidden flex items-center justify-center bg-white shadow-lg border-2 border-indigo-600 hover:scale-105 transition-all duration-300"
            title="Call Owner Directly"
        >
            <img src={telephoneLogo} alt="Call Owner" className="w-full h-full object-cover" />
        </a>
    );
};

export default FloatingCallButton;
