import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [loadingAvailability, setLoadingAvailability] = useState(false);
    const [showOptions, setShowOptions] = useState(false);
    const messagesEndRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, showOptions]);

    const handleOpenChat = async () => {
        setIsOpen(true);
        if (messages.length === 0) {
            // Step 1: User sends initial automated message
            setMessages([{ sender: 'user', text: 'Hi, I am visiting Velora Car Rentals! 👋' }]);
            
            // Step 2: Bot is "typing"
            setLoadingAvailability(true);
            
            // Step 3: Bot replies
            setTimeout(() => {
                setMessages(prev => [...prev, { 
                    sender: 'bot', 
                    text: 'Greetings! Welcome to Velora Rentals. 🚗 How can I help you today?' 
                }]);
                setLoadingAvailability(false);
                setShowOptions(true);
            }, 1500);
        }
    };

    const handleOptionClick = (option) => {
        setMessages(prev => [...prev, { sender: 'user', text: option.label }]);
        setShowOptions(false);
        setLoadingAvailability(true);
        
        setTimeout(() => {
            setLoadingAvailability(false);
            if (option.action === 'book') {
                if (location.pathname.includes('/car-details')) {
                    setMessages(prev => [...prev, { sender: 'bot', text: 'Great! Please select your Pick-up and Return dates on this page to continue.' }]);
                    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                } else {
                    setMessages(prev => [...prev, { sender: 'bot', text: 'Sure! Redirecting you to our fleet to choose a car first...' }]);
                    setTimeout(() => {
                        navigate('/cars');
                        setIsOpen(false);
                    }, 1500);
                }
            } else if (option.action === 'list') {
                setMessages(prev => [...prev, { sender: 'bot', text: 'Here is our amazing fleet! Redirecting...' }]);
                setTimeout(() => {
                    navigate('/cars');
                    setIsOpen(false);
                }, 1500);
            } else if (option.action === 'bookings') {
                setMessages(prev => [...prev, { sender: 'bot', text: 'Taking you to your bookings dashboard...' }]);
                setTimeout(() => {
                    navigate('/my-bookings');
                    setIsOpen(false);
                }, 1500);
            }
        }, 1000);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            {/* Chat Window */}
            {isOpen && (
                <div className="w-80 h-96 bg-white rounded-2xl shadow-2xl mb-4 flex flex-col overflow-hidden border border-gray-100 transition-all duration-300">
                    <div className="bg-[#25D366] text-white p-4 flex justify-between items-center shadow-md">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center font-bold">V</div>
                            <div>
                                <h3 className="font-semibold text-sm">Velora Support</h3>
                                <p className="text-xs text-white/80">Typically replies instantly</p>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                    </div>

                    <div className="flex-1 p-4 overflow-y-auto bg-[#efeae2] flex flex-col gap-3 relative">
                        {/* WhatsApp Chat Background Pattern Simulation */}
                        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>
                        
                        <div className="text-center my-2">
                            <span className="bg-white/60 text-gray-500 text-[10px] px-2 py-1 rounded-md uppercase tracking-wider backdrop-blur-sm">Today</span>
                        </div>

                        {messages.map((msg, index) => (
                            <div key={index} className={`max-w-[80%] p-3 rounded-2xl text-sm relative shadow-sm ${msg.sender === 'user' ? 'bg-[#d9fdd3] text-gray-800 self-end rounded-tr-none' : 'bg-white text-gray-800 self-start rounded-tl-none'}`}>
                                {msg.text}
                                <span className="text-[9px] text-gray-400 block text-right mt-1">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                            </div>
                        ))}

                        {loadingAvailability && (
                            <div className="bg-white text-gray-800 self-start p-3 rounded-2xl rounded-tl-none shadow-sm text-sm flex gap-1 items-center">
                                <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></span>
                                <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-75"></span>
                                <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-150"></span>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {showOptions && (
                        <div className="p-3 bg-white border-t border-gray-100 flex flex-wrap gap-2">
                            <button onClick={() => handleOptionClick({ label: '📅 Book a car', action: 'book' })} className="text-xs bg-[#25D366]/10 text-[#25D366] font-semibold py-1.5 px-3 rounded-full hover:bg-[#25D366]/20 transition-colors border border-[#25D366]/20">
                                Book a car
                            </button>
                            <button onClick={() => handleOptionClick({ label: '🚗 Explore cars', action: 'list' })} className="text-xs bg-blue-50 text-blue-600 font-semibold py-1.5 px-3 rounded-full hover:bg-blue-100 transition-colors border border-blue-200">
                                Explore cars
                            </button>
                            <button onClick={() => handleOptionClick({ label: '📋 Check My Bookings', action: 'bookings' })} className="text-xs bg-purple-50 text-purple-600 font-semibold py-1.5 px-3 rounded-full hover:bg-purple-100 transition-colors border border-purple-200">
                                Check My Bookings
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* Floating Button */}
            <button
                onClick={isOpen ? () => setIsOpen(false) : handleOpenChat}
                className="bg-[#25D366] text-white rounded-xl flex justify-center items-center px-5 py-3 shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-300 gap-3"
            >
                {!isOpen ? (
                    <>
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564c.173.087.289.129.332.202.043.073.043.423-.101.827z"></path>
                        </svg>
                        <span className="font-bold text-lg whitespace-nowrap">Chat on WhatsApp</span>
                    </>
                ) : (
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                )}
            </button>
        </div>
    );
};

export default ChatWidget;
