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
                                <i className="ri-profile-line text-3xl"></i>
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
                                <i className="ri-car-line text-3xl"></i>
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
