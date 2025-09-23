const TestComponent = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-16">
                <h1 className="text-4xl font-bold text-gray-900 mb-6">
                    Testing Tailwind CSS
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold text-emerald-600 mb-4">
                            Primary Button
                        </h2>
                        <button className="btn-primary">
                            Click Me
                        </button>
                    </div>
                    <div className="bg-black p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                            Secondary Button
                        </h2>
                        <button className="btn-secondary">
                            Click Me
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestComponent;