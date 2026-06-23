import React from 'react';

const FloatingCallButton = () => {
    return (
        <a 
            href="tel:+918500617107"
            className="fixed bottom-6 left-6 z-[100] w-14 h-14 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg hover:bg-indigo-700 hover:scale-105 transition-all duration-300"
            title="Call Owner Directly"
        >
            <i className="ri-phone-fill text-2xl"></i>
        </a>
    );
};

export default FloatingCallButton;
