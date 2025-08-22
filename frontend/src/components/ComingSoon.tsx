// src/components/ComingSoon.jsx
import React from 'react';
import { Clock, Construction } from 'lucide-react';

const ComingSoon = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md mx-auto border border-gray-200">
                <div className="mb-6">
                    <Construction
                        className="w-16 h-16 text-blue-600 mx-auto mb-4"
                    />
                </div>

                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Coming Soon
                </h2>

                <p className="text-gray-600 mb-6 leading-relaxed">
                    We're working hard to bring you something amazing. This page is currently under development and will be available soon.
                </p>

                <div className="flex items-center justify-center text-gray-500 mb-6">
                    <Clock className="w-4 h-4 mr-2" />
                    <span className="text-sm">Check back later for updates</span>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-600">
                        In the meantime, feel free to explore other sections of our website or contact us if you have any questions.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ComingSoon;
