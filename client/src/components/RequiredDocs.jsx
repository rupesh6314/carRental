import React from 'react';

const RequiredDocs = () => {
    return (
        <section className="py-16 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
                        Required Documents
                    </h2>
                    <p className="mt-4 text-lg text-slate-500">
                        Please provide the following documents to complete your rental booking. You can bring physical copies or upload digital ones.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {/* Aadhar Card */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 flex items-start space-x-6 hover:shadow-md transition-shadow">
                        <div className="flex-shrink-0">
                            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                                </svg>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Aadhar Card</h3>
                            <p className="text-slate-500">
                                Required for identity and address verification. Original or clear digital copy accepted.
                            </p>
                        </div>
                    </div>

                    {/* Driving Licence */}
                    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 flex items-start space-x-6 hover:shadow-md transition-shadow">
                        <div className="flex-shrink-0">
                            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-3.75a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm1.125 6h-6.75v-1.5h6.75v1.5z" />
                                </svg>
                            </div>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Driving Licence</h3>
                            <p className="text-slate-500">
                                A valid, unexpired Indian driving licence is mandatory for self-drive rentals.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RequiredDocs;
