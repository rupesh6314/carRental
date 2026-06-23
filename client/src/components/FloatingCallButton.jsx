import React from 'react';

const FloatingCallButton = () => {
    return (
        <a 
            href="tel:+918500617107"
            className="fixed bottom-6 left-6 z-[100] w-14 h-14 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-xl hover:bg-indigo-700 hover:scale-110 hover:shadow-2xl transition-all duration-300"
            title="Call Owner Directly"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21.384,17.752a2.108,2.108,0,0,1-.522,3.359,7.543,7.543,0,0,1-5.476.642C10.5,20.523,3.477,13.5,2.246,8.614a7.543,7.543,0,0,1,.642-5.476,2.108,2.108,0,0,1,3.359-.522L8.333,4.7a2.094,2.094,0,0,1,.445,2.328A3.877,3.877,0,0,1,8,8.2c-1.082,1.082-1.223,1.6-.457,2.368L13.432,16.45c.767.767,1.286.625,2.368-.457a3.877,3.877,0,0,1,1.171-.778,2.094,2.094,0,0,1,2.328.445Z"/>
            </svg>
        </a>
    );
};

export default FloatingCallButton;
